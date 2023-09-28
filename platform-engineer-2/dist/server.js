"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const routes_1 = __importDefault(require("./routes"));
class ServerHandler {
    constructor() {
        this.routes = [
            { method: 'POST', path: '/save-images', handler: routes_1.default.saveImages }
        ];
        this.requestHandler = async (req, res) => {
            try {
                const pathname = req.url;
                const { method } = req;
                const route = this.routes.find(route => route.path === pathname && route.method === method);
                if (!route) {
                    throw new Error(`Route not found for method: ${method}, and path: ${pathname}`);
                }
                const body = await this.bodyParser(req);
                return route.handler(body).handler(res);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.end(JSON.stringify({
                        error: {
                            message: error.message
                        }
                    }));
                }
            }
        };
        this.server = (0, http_1.createServer)(this.requestHandler);
    }
    start() {
        this.server.listen(3000);
        console.log('Server listening on port 3000');
    }
    async bodyParser(req) {
        try {
            const body = await new Promise((resolve, reject) => {
                let body = '';
                req.on('data', (chunk) => body += chunk.toString());
                req.on('end', () => resolve(body));
                req.on('error', () => reject('Error parsing body'));
            });
            return JSON.parse(body);
        }
        catch (err) {
            throw new Error('Invalid body');
        }
    }
}
exports.default = new ServerHandler();
