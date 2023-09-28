import { Injectable, Logger } from '@nestjs/common';
import { ImageDownloadDto } from '../../presentations/image/dto/image-download.dto';
import { Image } from '../../domains/model/image';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';

@Injectable()
export class ImageDownloadService {
  private readonly logger = new Logger(ImageDownloadService.name);
  private targetFolder = process.env.TARGET_FOLDER;
  private domain = '';

  constructor(private readonly httpService: HttpService) {}
  async imageDownload(): Promise<Image[]> {
    try {
      const data = fs.readFileSync('src/domains/data/images.json', 'utf8');
      const { images } = JSON.parse(data);

      const imageDownloadDto: ImageDownloadDto[] = [];

      for (const image of images) {
        const response = await this.httpService
          .get(image, { responseType: 'arraybuffer' })
          .toPromise();

        if (Buffer.byteLength(response.data) > 1024 * 1024) {
          this.logger.error('Image size is too large');
          continue;
        }
        this.domain = new URL(image).hostname;
        const path = `${this.targetFolder}/${this.domain}`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true });
        }

        const filePath = `${path}/${image.substring(
          image.lastIndexOf('/') + 1,
        )}`;

        fs.writeFileSync(filePath, image, { encoding: 'binary' });

        imageDownloadDto.push(
          new ImageDownloadDto(
            image.substring(image.lastIndexOf('/') + 1),
            image,
            filePath,
          ),
        );

        this.logger.log(`Image download success: ${image}`);
      }

      const imageList: Image[] = [];
      for (const image of imageDownloadDto) {
        const { name, url, path } = image;
        imageList.push(new Image(name, url, path));
      }
      this.logger.log('Image download complete');

      return imageList;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
