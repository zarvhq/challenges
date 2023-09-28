# ZarvHQ Image Downloader App

This repository contains an image downloader application developed by ZarvHQ. The application allows you to download images from web URLs specified in a JSON file and save them to a local destination folder. The folders in the destination directory are named after the domain names of the URLs. Images larger than 1MB are skipped, and a log message is generated without interrupting the process.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Example JSON File](#example-json-file)

## Tech Stack

- JavaScript (TypeScript optional)
- Node.js

## Installation

To get started with the ZarvHQ Image Downloader App, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/alexanderyokogawa/zarvhq-image-downloader-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd zarvhq-image-downloader-app
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```
## Documentation

```bash
   in your browser, access the following url: http://localhost:3000/api
   ```

## Running the App

You can run the app using the following command:

```bash
npm start
```

## Running Tests

To run the tests, use the following command:

```bash
npm run test
npm run test:e2e
```

This will execute the test suite and provide feedback on the functionality of the `ImageDownloadService` class.

## Usage
```bash
access the following url: http://localhost:3000/image in postman or your browser
```

## Example JSON File

Here is an example of the JSON file format that the function can handle:

```json
{
  "images": [
    "https://www.w3schools.com/w3css/img_lights.jpg",
    "https://www.w3schools.com/w3css/img_forest.jpg",
    "https://www.w3schools.com/w3css/img_mountains.jpg",
    "https://www.w3schools.com/w3css/img_snowtops.jpg",
    "https://www.jetbrains.com/lp/dotnet-unity/static/rider-183-unity-control-175bb569c94e2108a0573776f4bf4de5.gif"
  ]
}
```

---

Developed with ❤️ by Alexander Yokogawa.
