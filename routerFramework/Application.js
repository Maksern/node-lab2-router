import * as http from "http";
import { EventEmitter } from "events";

class Application {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.server = this.#createServer();
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.eventEmitter.on(this.#getRouterMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  #createServer() {
    return http.createServer(async (req, res) => {
      const emitted = this.eventEmitter.emit(
        this.#getRouterMask(req.url, req.method),
        req,
        res,
      );
      if (!emitted) {
        res.end();
      }
    });
  }
  #getRouterMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

export default Application;
