#!/usr/bin/env node

const winston = require("winston");
const fs = require('fs');

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

if (process.argv[2] === undefined) {
    logger.error("the first argument must be a path to a valid json file");
    return;
}

if (process.argv[3] === undefined) {
    logger.error("the second argument must be the name of a destination folder");
    return;
}

const input = process.argv[2];
const output = process.argv[3];

const obj = JSON.parse(fs.readFileSync(input, 'utf8'));

if (obj.images === undefined || obj.images === null) {
    logger.error("the json file need to have an attribute \'images\' with a valid list of image links");
    return;
}

if (!obj.images.length) {
    logger.info("the images list is empty");
    return;
}

logger.info(`destination folder: ${output}`)

obj.images.forEach(element => {
    logger.info(element);
});

