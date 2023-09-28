import { Module } from '@nestjs/common';
import { ImageDownloadService } from './image-download.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ImageDownloadService],
  exports: [ImageDownloadService],
})
export class ServicesModule {}
