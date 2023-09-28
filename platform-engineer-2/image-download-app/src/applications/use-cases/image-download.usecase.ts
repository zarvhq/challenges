import { Image } from '../../domains/model/image';
import { ImageDownloadService } from '../../infrastructures/Service/image-download.service';

export class ImageDownloadUsecase {
  constructor(private imageDownloadService: ImageDownloadService) {}
  async execute(): Promise<Image[]> {
    return this.imageDownloadService.imageDownload();
  }
}
