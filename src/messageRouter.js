import Router from "../routerFramework/Router.js";

const messageRouter = new Router();

const messages = [
  { senderId: 1, recipientId: 2, messageText: "Hi" },
  { senderId: 3, recipientId: 5, messageText: "Nice to hear you" },
  { senderId: 2, recipientId: 1, messageText: "Look forward to our meeting" },
  { senderId: 5, recipientId: 2, messageText: "Good day" },
  { senderId: 2, recipientId: 4, messageText: "Nice, and you?" },
  { senderId: 4, recipientId: 2, messageText: "How are you?" },
  { senderId: 1, recipientId: 3, messageText: "Hello" },
];

messageRouter.get("/messages", (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  return res.end(JSON.stringify(messages));
});

export default messageRouter;
