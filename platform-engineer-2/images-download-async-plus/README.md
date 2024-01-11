# Platform Engineer Challenge

> Level: **Standard/Advance**

## Tech Stack

Expected for this challenge is Javascript. Not required to use Typescript but it is a plus.
This position will be working full time with JS codebase.

### Suggested QuickStart setup, less time setting up, more time coding

NodeJs 16 or higher is required. Just navigate to quick-start folder and `npm install`.
The quick setup does not have typescript setup. If you want to use typescript, you will need to setup yourself.
The dependencies are only jest and axios, and they are not required to be used. Feel free to use other libs if you want.

## Some requirements that are worth mentioning

- Tests are a hard requirement. We expect to see tests for the code you write.
- We expect to see a README file with instructions on how to run the code and the tests.
- We expect tests to be mature in the sense of not only testing happy paths but also edge cases.
- Clear separation of concerns is a must.
- Separation of side effects from pure functions is a big plus.

## Instructions

Code a function that takes a JSON file path which has URL's for images on the web and a destination root local folder.

Have a npm script that runs the function with the following command:

```bash

npm run download-images <json-file-path> <destination-folder>

```

- The function must download the images and save them in the local folder's.
- This folders must be named after the domain name of the URL's. Is is per domain, for example. `w3schools` and `google.images` are separated folders in side of the root destination folder
- Also, the images that are larger than 1MB in size must not be downloaded and an log must be produced without stopping the function.
- Furthermore, the function must return a list of the downloaded images paths.

More details about the function:

- The function must be able to handle at least 10000 images. Have backpressure in mind and limit concurrency.

Here are some examples of images that can be used for testing:

- https://www.w3schools.com/w3css/img_lights.jpg
- https://www.w3schools.com/w3css/img_forest.jpg
- https://www.w3schools.com/w3css/img_mountains.jpg
- https://www.w3schools.com/w3css/img_snowtops.jpg

Example of JSON file to be handled.

```json
{
  "images": [
    "https://www.w3schools.com/w3css/img_lights.jpg",
    "https://www.w3schools.com/w3css/img_forest.jpg",
    "https://www.w3schools.com/w3css/img_mountains.jpg",
    "https://www.w3schools.com/w3css/img_snowtops.jpg"
  ]
}
```
