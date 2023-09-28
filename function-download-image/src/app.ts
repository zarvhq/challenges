import { downloadImagesFromJSON } from './service/dounload-image.service';

// Capture command line arguments
const jsonFilePath = process.argv[2];
const targetFolder = process.argv[3];

if (!jsonFilePath || !targetFolder) {
    console.error('Enter the JSON file path and destination folder.');
    process.exit(1);
}

downloadImagesFromJSON(jsonFilePath, targetFolder);
