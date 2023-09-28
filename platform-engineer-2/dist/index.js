"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __importDefault(require("./handler"));
async function main(jsonFilePath) {
    try {
        console.log('jsonFilePath: ', jsonFilePath);
        const imageHandler = new handler_1.default(jsonFilePath);
        const results = await imageHandler.handle();
        console.log('results: ', results);
        return results;
    }
    catch (error) {
        console.log('error: ', error);
    }
}
exports.default = main;
main('../images.json');
