import Router from "./routerFramework/Router.js";
import Application from "./routerFramework/Application.js";

const router = new Router();
router.get("/users", (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  return res.end(JSON.stringify([{ userId: 1, userName: "Voron" }]));
});

router.get("/messages", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end("<h1>Home page</h1>");
});

const PORT = 5000;
const app = new Application();
app.addRouter(router);

app.listen(PORT, () => {
  console.log(`Server success started on port ${PORT}`);
});
