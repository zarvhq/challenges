import { Module } from '@nestjs/common';
import { UseCaseProxyModule } from './infrastructures/usecase-proxy/usecase-proxy.module';
import { ImageModule } from './presentations/image/image.module';
import { EnvironmentConfigModule } from './infrastructures/config/environment-config/environment-config.module';
import { ImageController } from './presentations/image/image.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UseCaseProxyModule.register(),
    ImageModule,
    EnvironmentConfigModule,
  ],
  controllers: [ImageController],
})
export class AppModule {}
