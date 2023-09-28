import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { IRouterHandler } from './routes/route-handler';
import { ValidationError } from 'joi';
import router from './routes';

interface IRoute {
  method: string,
  path: string,
  handler: (body: any) => IRouterHandler
}

class ServerHandler {
  server: Server
  routes: IRoute[] = [
    { method: 'POST', path: '/save-images', handler: router.saveImages }
  ];

  constructor () {
    this.server = createServer(this.requestHandler)
  }

  start () {
    this.server.listen(3000)
    console.log('Server listening on port 3000')
  }

  async bodyParser (req: IncomingMessage) {
    try {
      const body: string = await new Promise(
        (resolve, reject) => {
          let body = '';
          req.on('data', (chunk) => body += chunk.toString());
          req.on('end', () => resolve(body));
          req.on('error', () => reject('Error parsing body'));
        }
      )
      return JSON.parse(body)
    } catch (err) {
      throw new Error('Invalid body')
    }
    
  }

  requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const pathname = req.url;
      const { method } = req;
      const route = this.routes.find(
        route => route.path === pathname && route.method === method
      );
      if (!route) {
        throw new Error(
          `Route not found for method: ${method}, and path: ${pathname}`
        );
      }
      const body = await this.bodyParser(req);
      return route.handler(body).handler(res)
    } catch (error) {
      if (error instanceof Error) {
        res.end(
          JSON.stringify({
            error: {
              message: error.message
            }
          })
        );
      }
    }
  }
}

export default new ServerHandler()