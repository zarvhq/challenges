import { Controller, Get, Inject } from '@nestjs/common';
import { UseCaseProxyModule } from '../../infrastructures/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from '../../infrastructures/usecase-proxy/usecase-proxy';
import { ImageDownloadUsecase } from '../../applications/use-cases/image-download.usecase';
import { Image } from '../../domains/model/image';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('image')
@ApiTags('image')
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiExtraModels(Image)
export class ImageController {
  constructor(
    @Inject(UseCaseProxyModule.DOWNLOAD_IMAGE)
    private readonly downloadImageUseCaseProxy: UseCaseProxy<ImageDownloadUsecase>,
  ) {}
  @Get()
  async downloadImage(): Promise<Image[]> {
    return await this.downloadImageUseCaseProxy.getInstance().execute();
  }
}
