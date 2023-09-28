import { ServerResponse } from 'http';
import RouteHandler from '../route-handler';
import { schemaValidator } from './validation';
import fs, { createWriteStream } from 'fs';
import path from 'path';
import axios from 'axios';
import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

interface ISaveImagesRoutBody {
  jsonFilePath: string,
  outputFilePath: string
}

export default class SaveImagesRoute extends RouteHandler {
  constructor(body: ISaveImagesRoutBody) {
    super(body, schemaValidator)
  }

  getJsonParsed() {
    const jsonRaw = fs.readFileSync(path.join(process.cwd(), 'images.json'));
    return JSON.parse(jsonRaw.toString());
  }

  saveImage(data: any, path: string) {
    const writer = createWriteStream(path);
    return new Promise(
      () => {
        data.pipe(writer);
        return finished(writer);
      }
    )
  }

  createFolder(folderName: string) {
    const folderPath = path.join(process.cwd(), folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  getImageDataError(message: string, imageUrl: string) {
    return {
      error: {
        message: `${message}, url: ${imageUrl}`,
      }
    }
  }

  async getImageData (imageUrl: string) {
    const { href, pathname } = new URL(imageUrl);
    const folderName = pathname.split('/')[1] || false;
    const fileName = pathname.split('/')[2] || false;
    console.log('folderName, fileName: ', folderName, fileName);
    if (!folderName) {
      return this.getImageDataError('Folder name not found', imageUrl)
    }

    const {data, headers} = await axios({
      method: 'get',
      url: href,
      responseType: 'stream'
    });
    console.log('data: ', data);
    if (+headers['content-length'] > 1048576) {
      return this.getImageDataError('Image is bigger than 1MB', imageUrl)
    }

    return {
      data,
      folderName,
      fileName
    }
  }

  async handler(res: ServerResponse) {
    super.validate()
    const { jsonFilePath, outputFilePath } = this.body;
    const { images } = this.getJsonParsed();

    const imagesData = await Promise.all(
      images.map((url: string) => this.getImageData(url))
    )

    await Promise.all(
      imagesData.map(({ folderName }) => this.createFolder(folderName))
    )

    const results = await Promise.all(
      imagesData.map(({ data, folderName, fileName, error }) => {
        if (error) return
        return this.saveImage(data, folderName)
      })
    )

    console.log('results: ', results);
    // const imagesDataResult = await Promise.all(
    //   imagesData.map(({ data, folderName }) => {
    //     const writer = fs.createWriteStream(path.join(process.cwd(), folderName))
    //     return new Promise((resolve, reject) => {
    //       data.pipe(writer)
    //       writer.on('finish', (e: any) => resolve(e))
    //       writer.on('error', (e: any) => reject(e))
    //       // data
    //       //   .pipe(fs.createWriteStream(path.join(process.cwd(), folderName)))
    //       //   .on('finish', (e: any) => resolve(e))
    //       //   .on('error', (e: any) => reject(e))
    //     })
    //   })
    // )
    // console.log('imagesDataResult: ', imagesDataResult);

    res.end('OK')
  }
}