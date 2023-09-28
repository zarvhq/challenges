import ImageHandler from './handler';

export default async function main () {
  const imageHandler = new ImageHandler()
  const results = await imageHandler.handle()
  console.log('results: ', results)
  return results
}

main()