"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_handler_1 = __importDefault(require("../route-handler"));
const validation_1 = require("./validation");
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const stream = __importStar(require("stream"));
const util_1 = require("util");
const finished = (0, util_1.promisify)(stream.finished);
class SaveImagesRoute extends route_handler_1.default {
    constructor(body) {
        super(body, validation_1.schemaValidator);
    }
    getJsonParsed() {
        const jsonRaw = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'images.json'));
        return JSON.parse(jsonRaw.toString());
    }
    saveImage(data, path) {
        const writer = (0, fs_1.createWriteStream)(path);
        return new Promise(() => {
            data.pipe(writer);
            return finished(writer);
        });
    }
    createFolder(folderName) {
        const folderPath = path_1.default.join(process.cwd(), folderName);
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
    }
    getImageDataError(message, imageUrl) {
        return {
            error: {
                message: `${message}, url: ${imageUrl}`,
            }
        };
    }
    async getImageData(imageUrl) {
        const { href, pathname } = new URL(imageUrl);
        const folderName = pathname.split('/')[1] || false;
        const fileName = pathname.split('/')[2] || false;
        console.log('folderName, fileName: ', folderName, fileName);
        if (!folderName) {
            return this.getImageDataError('Folder name not found', imageUrl);
        }
        const { data, headers } = await (0, axios_1.default)({
            method: 'get',
            url: href,
            responseType: 'stream'
        });
        console.log('data: ', data);
        if (+headers['content-length'] > 1048576) {
            return this.getImageDataError('Image is bigger than 1MB', imageUrl);
        }
        return {
            data,
            folderName,
            fileName
        };
    }
    async handler(res) {
        super.validate();
        const { jsonFilePath, outputFilePath } = this.body;
        const { images } = this.getJsonParsed();
        const imagesData = await Promise.all(images.map((url) => this.getImageData(url)));
        await Promise.all(imagesData.map(({ folderName }) => this.createFolder(folderName)));
        const results = await Promise.all(imagesData.map(({ data, folderName, fileName, error }) => {
            if (error)
                return;
            return this.saveImage(data, folderName);
        }));
        console.log('results: ', results);
        // const imagesDataResult = await Promise.all(
        //   imagesData.map(({ data, folderName }) => {
        //     const writer = fs.createWriteStream(path.join(process.cwd(), folderName))
        //     return new Promise((resolve, reject) => {
        //       data.pipe(writer)
        //       writer.on('finish', (e: any) => resolve(e))
        //       writer.on('error', (e: any) => reject(e))
        //       // data
        //       //   .pipe(fs.createWriteStream(path.join(process.cwd(), folderName)))
        //       //   .on('finish', (e: any) => resolve(e))
        //       //   .on('error', (e: any) => reject(e))
        //     })
        //   })
        // )
        // console.log('imagesDataResult: ', imagesDataResult);
        res.end('OK');
    }
}
exports.default = SaveImagesRoute;
