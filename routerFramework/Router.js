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

export default Router;
