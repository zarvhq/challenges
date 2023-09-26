# Platform Engineer Challenge

> Level: **Standard**

## Tech Stack

Expected for this challenge is Javascript. Not required to use Typescript but it is a plus.
This position will be working full time with JS codebase.

## Some requirements that are worth mentioning

- Tests are a hard requirement. We expect to see tests for the code you write.
- We expect to see a README file with instructions on how to run the code and the tests.
- We expect tests to be mature in the sense of not only testing happy paths but also edge cases.
- Clear separation of concerns is a must.
- Separation of side effects from pure functions is a big plus.

## Instructions

Code a function that takes a JSON file path which has URL's for images on the web and a destination root local folder.

- The function must download the images and save them in the local folder's.
- This folders must be named after the domain name of the URL's.
- Also, the images that are larger than 1MB in size must not be downloaded and an log must be produced without stopping the function.
- Furthermore, the function must return a list of the downloaded images paths.

The function must be able to handle the following URL's:

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

Solution:

The project has tests (jest) to be run with ```npx jest```. Additionally, it has an app.ts file that can be run with ```npx ts-node ./src/app.ts```