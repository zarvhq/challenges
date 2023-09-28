import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get('PORT'));
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }
}
