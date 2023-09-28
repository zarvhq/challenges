export class ImageDownloadDto {
  name: string;
  url: string;
  path: string;

  constructor(name: string, url: string, path: string) {
    this.name = name;
    this.url = url;
    this.path = path;
  }
}
