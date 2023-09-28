import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { downloadImagesFromJSON } from './download-image.service';
import * as console from "console";

jest.mock('axios');
jest.mock('fs');

describe('downloadImagesFromJSON', () => {
    it('should download images and return paths', async () => {
        const jsonFilePath = '../mock/mock-images.json';
        const targetFolder = '../mock/mock-destination';

        const jsonData = {
            images: [
                'https://www.w3schools.com/w3css/img_lights.jpg',
                'https://www.w3schools.com/w3css/img_forest.jpg',
            ],
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: Buffer.from('https://www.w3schools.com/w3css/img_lights.jpg'),
        });

        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: Buffer.from('https://www.w3schools.com/w3css/img_forest.jpg'),
        });

        // Mock fs.existsSync para retornar true
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        // Mock fs.mkdirSync
        (fs.mkdirSync as jest.Mock).mockReturnValue(2);

        // Mock fs.writeFileSync
        (fs.writeFileSync as jest.Mock).mockReturnValue(2);

        console.log('jsonFilePath', jsonFilePath);
        const downloadedImagePaths = await downloadImagesFromJSON(jsonFilePath, targetFolder);

        expect(downloadedImagePaths).toEqual([
            path.join(targetFolder, 'www.w3schools.com/img_lights.jpg'),
            path.join(targetFolder, 'www.w3schools.com/img_forest.jpg'),
        ]);

        expect(axios.get).toHaveBeenCalledTimes(2);

        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);

        expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    });

    it('should skip images larger than 1MB', async () => {
        const jsonFilePath = '../mock/mock-images-large.json';
        const targetFolder = '../mock/mock-destination';

        const jsonData = {
            images: ['https://www.jetbrains.com/lp/dotnet-unity/static/rider-183-unity-control-175bb569c94e2108a0573776f4bf4de5.gif'],
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: Buffer.alloc(1024 * 1024 + 1), // Mais de 1MB
        });

        (fs.existsSync as jest.Mock).mockReturnValue(true);

        (fs.mkdirSync as jest.Mock).mockReturnValue(1);

        (fs.writeFileSync as jest.Mock).mockReturnValue(1);

        const downloadedImagePaths = await downloadImagesFromJSON(jsonFilePath, targetFolder);

        expect(downloadedImagePaths).toEqual([]);

        expect(axios.get).toHaveBeenCalledTimes(3);

        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);

        expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    });

    it('should handle errors', async () => {
        const jsonFilePath = '../mock/mock-images.json';
        const targetFolder = '../mock/mock-destination';

        (axios.get as jest.Mock).mockRejectedValue(new Error('Mocked error'));

        await expect(downloadImagesFromJSON(jsonFilePath, targetFolder)).rejects.toThrowError(
            'Mocked error'
        );

        expect(axios.get).toHaveBeenCalledTimes(4);

        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);

        expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    });
});
