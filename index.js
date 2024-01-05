import Application from "./routerFramework/Application.js";
import userRouter from "./src/userRouter.js";
import messageRouter from "./src/messageRouter.js";

const PORT = 5000;
const app = new Application();
app.addRouter(userRouter);
app.addRouter(messageRouter);

app.listen(PORT, () => {
  console.log(`Server success started on port ${PORT}`);
});
