const { getFolderName } = require('./url-decoder');

describe('decode folder name', () => {
    it('w3schools', async () => {      
        const url = "https://www.w3schools.com/w3css/img_lights.jpg"
        expect(getFolderName(url)).toBe("w3schools");
    });

    it('google.com', async () => {      
        const url = "https://www.google.images.com/w3css/img_lights.jpg"
        expect(getFolderName(url)).toBe("google.images");
    });
})