import SaveImages from './save-images';

export default {
  saveImages: (body: any) => new SaveImages(body)
}
