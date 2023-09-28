import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as console from "console";

export async function downloadImagesFromJSON(jsonFilePath: string, targetFolder: string) {
  try {
    // Read the contents of the JSON file
    const jsonData = require(jsonFilePath);

    // Checks if the destination directory exists, otherwise creates it
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const downloadedImagePaths: string[] = [];

    const { images } = jsonData;

    // Loop through image URLs in JSON
    for (const imageUrl of images) {
      // start downloading the image
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      // Get the domain name from the URL to name the folder
      const domainName = new URL(imageUrl).hostname;
      const domainFolder = path.join(targetFolder, domainName);
      // Get the file name from the URL
      const fileName = path.basename(imageUrl);

      // Checks if the image size is less than 1MB
      if (Buffer.byteLength(response.data) > 1024 * 1024) {
        console.warn(`Image '${fileName}' exceeds 1 MB. It was not downloaded.`);
        continue;
      }

      // Checks if the domain folder exists, otherwise creates it
      if (!fs.existsSync(domainFolder)) {
        fs.mkdirSync(domainFolder, { recursive: true });
      }

      // Create the full path to save the image
      const imagePath = path.join(domainFolder, fileName);

      // Save the image to the specified path
      fs.writeFileSync(imagePath, response.data);
      downloadedImagePaths.push(imagePath);
      console.log(`Image '${fileName}' downloaded successfully.`);
    }

    console.log('Downloads completed.');
    return downloadedImagePaths;
  } catch (error) {
    console.error('Error while downloading images:', error);
    throw error;
  }
}
