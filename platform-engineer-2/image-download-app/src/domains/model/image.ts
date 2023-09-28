import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  path: string;
  constructor(name: string, url: string, path: string) {
    this.name = name;
    this.url = url;
    this.path = path;
  }
}
