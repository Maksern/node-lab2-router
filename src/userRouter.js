import Router from "../routerFramework/Router.js";

const userRouter = new Router();

const users = [
  { userId: 1, userName: "Voron" },
  { userId: 2, userName: "Nastya" },
  { userId: 3, userName: "Maksym" },
  { userId: 4, userName: "Doctor" },
  { userId: 5, userName: "Shon" },
];

userRouter.get("/users", (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  return res.end(JSON.stringify(users));
});

export default userRouter;
