import main from '../src/index';
import path from 'path';

describe('ImageHandler', () => {
  it('should return error with image larger than 1MB', async () => {
    const mockPath = path.join(process.cwd(), './test/mocks/image-too-big.json')
    console.log('mockPath: ', mockPath);
    const response = await main(mockPath)
    const {result, errors} = response
    console.log('result: ', result);
    expect(errors.length).toBe(1);
    expect(errors[0].errorMessage).toContain('Image is bigger than 1MB')
  })

  it('should save image', async () => {
    console.log('process.cwd(): ', process.cwd());
    const mockPath = path.join(process.cwd(), 'images.json');
    const response = await main(mockPath)
    const {result, errors} = response
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
  })
})