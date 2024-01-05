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

userRouter.post("/users", (req, res) => {
  const user = { userId: users.length + 1, userName: req.body.userName };
  users.push(user);

  res.writeHead(200, { "Content-type": "application/json" });
  return res.end(JSON.stringify(user));
});

userRouter.put("/users", (req, res) => {
  let result;
  let success = false;

  users.forEach((user) => {
    if (user.userId == req.body.userId) {
      user.userName = req.body.userName;
      result = user;
      success = true;
    }
  });

  if (success) {
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(result));
  }
  return res.end("User with this id not exist");
});

export default userRouter;
