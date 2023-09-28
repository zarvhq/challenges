import { Test, TestingModule } from '@nestjs/testing';
import { ImageDownloadService } from './image-download.service';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

describe('ImageDownloadService', () => {
  let service: ImageDownloadService;
  let httpService: HttpService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageDownloadService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImageDownloadService>(ImageDownloadService);
    httpService = module.get<HttpService>(HttpService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should download images and return Image objects', async () => {
    httpService.get = jest.fn().mockReturnValue({
      toPromise: () => Promise.resolve({ data: 'image_data' }),
    });

    const result = await service.imageDownload();

    expect(result).toHaveLength(5);
    expect(httpService.get).toHaveBeenCalledTimes(5);
    expect(logger.log).toHaveBeenCalledTimes(0);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should skip images with size > 1MB and log an error', async () => {
    httpService.get = jest.fn().mockReturnValue({
      toPromise: () => Promise.resolve({ data: Buffer.alloc(1024 * 1024 + 1) }), // 1MB + 1 byte
    });

    const result = await service.imageDownload();

    expect(result).toHaveLength(0);
    expect(httpService.get).toHaveBeenCalledTimes(5);
    expect(logger.error).toHaveBeenCalledTimes(0);
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should handle errors and throw an error', async () => {
    httpService.get = jest.fn().mockReturnValue({
      toPromise: () => Promise.reject(new Error('HTTP error')),
    });

    await expect(service.imageDownload()).rejects.toThrow('HTTP error');
    expect(httpService.get).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(0);
    expect(logger.log).not.toHaveBeenCalled();
  });
});
