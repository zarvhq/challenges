# Download images from JSON

This Node.js function allows you to download images from a list of web URLs specified in a JSON file and save them to a local destination folder. The function checks the size of each image and ignores those larger than 1 MB, while creating separate folders for images from each domain within the destination folder.

## Installation

1. Clone or download this repository to your local machine.

2. Open a terminal and navigate to the project directory.

3. Install the project dependencies by running:

     ```bash
     npm installation
     ```

## Usage

  ```bash
     npm run build
     node dist/app.js path_to_json folder_destination
  ```

## Explanation of the function

- The function reads the contents of the JSON file specified by `jsonFilePath`.

- Checks whether the target directory specified by `targetFolder` exists; otherwise it creates it recursively.

- For each image URL in the JSON file, the function downloads the image using axios and checks its size. Images larger than 1 MB are ignored and a warning is logged.

- Extracts the domain name from the image URL and creates a folder with that name inside the destination folder.

- The image is saved in the appropriate path in the domain folder.

- The function returns an array of downloaded image paths.

## Error handling

If an error occurs during the process, the function logs an error message and generates an error, which you can capture and handle in your application.

## Notes

- This function uses the axios library to make HTTP requests and assumes that it is installed in your project.

- Make sure you have the appropriate permissions to create folders and write files to the specified destination folder.
