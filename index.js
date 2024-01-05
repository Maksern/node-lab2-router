import * as http from "node:http";
import { EventEmitter } from "events";

const PORT = 5000;
const eventEmitter = new EventEmitter();
class Router {
  constructor() {
    this.endpoints = {};
  }

  addRequest(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`A handler for ${path}/${method} already exist`);
    }

    endpoint[method] = handler;

    eventEmitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler) {
    this.addRequest("GET", path, handler);
  }

  post(path, handler) {
    this.addRequest("POST", path, handler);
  }

  put(path, handler) {
    this.addRequest("PUT", path, handler);
  }

  delete(path, handler) {
    this.addRequest("DElETE", path, handler);
  }
}

const router = new Router();
router.get("/users", (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  return res.end(JSON.stringify([{ userId: 1, userName: "Voron" }]));
});

router.get("/messages", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("<h1>Home page</h1>");
});

const server = http.createServer(async (req, res) => {
  eventEmitter.emit(`[${req.url}]:[${req.method}]`, req, res);
});

server.listen(PORT, () => {
  console.log(`Server success started on port ${PORT}`);
});
