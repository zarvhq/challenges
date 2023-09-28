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
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const validation_1 = require("./validation");
const stream = __importStar(require("stream"));
const util_1 = require("util");
const finished = (0, util_1.promisify)(stream.finished);
class ImageHandler {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.validate({ jsonFilePath: this.jsonFilePath });
    }
    validate(body) {
        const validation = (0, validation_1.schemaValidator)(body);
        if (validation.error instanceof Error) {
            throw new Error(validation.error.details.map(({ message }) => message).join(', '));
        }
    }
    getJsonParsed() {
        const jsonRaw = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'images.json'));
        return JSON.parse(jsonRaw.toString());
    }
    saveImage(data, path) {
        const writer = (0, fs_1.createWriteStream)(path);
        return new Promise((resolve, reject) => {
            data.pipe(writer);
            writer.on('finish', () => resolve(path));
            writer.on('error', (error) => reject(`Error saving image (${path}): ${error}`));
            return finished(writer);
        });
    }
    createFolder(folderName) {
        const folderPath = path_1.default.join(process.cwd(), folderName.toString());
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
        var _a;
        const { href, pathname } = new URL(imageUrl);
        const pathSplit = pathname.split('/');
        const folderName = pathSplit[pathSplit.length - 2];
        const fileName = (_a = pathSplit[pathSplit.length - 1]) === null || _a === void 0 ? void 0 : _a.split('?')[0];
        const { data, headers } = await (0, axios_1.default)({
            method: 'get',
            url: href,
            responseType: 'stream'
        });
        if (+headers['content-length'] > 1048576) {
            console.log(`Image is bigger than 1MB: ${imageUrl}`);
            return;
        }
        return {
            data,
            folderName,
            fileName
        };
    }
    async handle() {
        const { images } = this.getJsonParsed();
        const imagesData = await Promise.all(images.map((url) => this.getImageData(url)));
        const imagesDataWithoutErrors = imagesData.filter((data) => !!data);
        // Creating folders before save images
        await Promise.all(imagesDataWithoutErrors.map(({ folderName }) => this.createFolder(folderName)));
        return Promise.all(imagesDataWithoutErrors.map(({ data, folderName, fileName, error }) => {
            if (error)
                return error;
            return this.saveImage(data, path_1.default.join(process.cwd(), folderName, fileName));
        }));
    }
}
exports.default = ImageHandler;
