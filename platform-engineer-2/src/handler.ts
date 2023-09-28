import fs, { createWriteStream, write } from 'fs';
import path, { resolve } from 'path';
import axios from 'axios';
import { schemaValidator } from './validation';
import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

export default class ImageHandler {

  constructor(
    private jsonFilePath: string,
  ) {
    this.validate({jsonFilePath: this.jsonFilePath})
  }

  validate (body: any) {
    const validation = schemaValidator(body);
    if (validation.error instanceof Error) {
      throw new Error(
        validation.error.details.map(
          ({message}) => message
        ).join(', ')
      )
    }
  }

  getJsonParsed() {
    console.log('this.jsonFilePath: ', this.jsonFilePath);
    const jsonRaw = fs.readFileSync(this.jsonFilePath);
    return JSON.parse(jsonRaw.toString());
  }

  saveImage(data: any, path: string) {
    const writer = createWriteStream(path);
    return new Promise(
      (resolve, reject) => {
        data.pipe(writer);
        writer.on('finish', () => resolve(path));
        writer.on('error', (error: any) => reject(`Error saving image (${path}): ${error}`));
        return finished(writer);
      }
    )
  }

  createFolder(folderName: string) {
    const folderPath = path.join(process.cwd(), folderName.toString());
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  getImageDataError(message: string, imageUrl: string) {
    return {
      errorMessage: `${message}, url: ${imageUrl}`
    }
  }

  async getImageData (imageUrl: string) {
    const { href, pathname } = new URL(imageUrl);
    const pathSplit = pathname.split('/')
    const folderName = pathSplit[pathSplit.length - 2];
    const fileName = pathSplit[pathSplit.length - 1]?.split('?')[0];
    const {data, headers} = await axios({
      method: 'get',
      url: href,
      responseType: 'stream'
    });


    if (+headers['content-length'] > 1048576) {
      console.log(`Image is bigger than 1MB: ${imageUrl}`)
      return this.getImageDataError('Image is bigger than 1MB', imageUrl)
    }

    return {
      data,
      folderName,
      fileName
    }
  }

  async handle() {
    const { images } = this.getJsonParsed();

    const imagesData = await Promise.all(
      images.map((url: string) => this.getImageData(url))
    )

    const valid: any[] = []
    const invalid: any [] = []
    imagesData.forEach((data) => {
      if (data.errorMessage) return invalid.push(data)
      valid.push(data)
    })

    // Creating folders before save images
    await Promise.all(
      valid.map(({ folderName }) => this.createFolder(folderName))
    )

    const result = await Promise.all(
      valid.map(({ data, folderName, fileName, error }) => {
        if (error) return error
        return this.saveImage(
          data,
          path.join(process.cwd(), folderName, fileName)
        )
      })
    )

    return {
      result,
      errors: invalid
    }
  }
}