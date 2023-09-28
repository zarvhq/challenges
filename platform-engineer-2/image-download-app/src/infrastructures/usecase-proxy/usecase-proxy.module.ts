import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UseCaseProxy } from './usecase-proxy';
import { ImageDownloadUsecase } from '../../applications/use-cases/image-download.usecase';
import { ImageDownloadService } from '../Service/image-download.service';
import { ServicesModule } from '../Service/services.modele';

@Module({
  imports: [EnvironmentConfigModule, ServicesModule],
})
export class UseCaseProxyModule {
  static DOWNLOAD_IMAGE = 'downloadImageUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCaseProxyModule,
      providers: [
        {
          inject: [ImageDownloadService],
          provide: UseCaseProxyModule.DOWNLOAD_IMAGE,
          useFactory: (imageDownloadService: ImageDownloadService) => {
            return new UseCaseProxy(
              new ImageDownloadUsecase(imageDownloadService),
            );
          },
        },
      ],
      exports: [UseCaseProxyModule.DOWNLOAD_IMAGE],
    };
  }
}
