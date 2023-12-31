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
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        const emitted = this.eventEmitter.emit(
          this.#getRouterMask(req.url, req.method),
          req,
          res,
        );
        if (!emitted) {
          res.end("This is default page. Try url /users or /messages");
        }
      });
    });
  }

  #getRouterMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

export default Application;
