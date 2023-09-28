import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from '../../infrastructures/usecase-proxy/usecase-proxy.module';
import { ImageController } from './image.controller';

@Module({
  imports: [UseCaseProxyModule.register()],
  controllers: [ImageController],
})
export class ImageModule {}
