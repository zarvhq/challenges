import ImageHandler from './handler';
import path from 'path';

export default async function main (jsonFilePath: string) {
  try {
    const imageHandler = new ImageHandler(jsonFilePath)
    return imageHandler.handle()
  } catch (error) {
    return {
      result: undefined,
      errors: [error]
    }
  }
}

main(path.resolve(process.cwd(), 'images.json'))