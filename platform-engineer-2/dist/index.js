"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __importDefault(require("./handler"));
async function main() {
    const imageHandler = new handler_1.default();
    await imageHandler.handle();
}
exports.default = main;
main();
