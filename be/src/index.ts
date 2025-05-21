import express from "express";
import cors from "cors";
import qrcode from "qrcode";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
const port = 8000;

const qrs = {

}
const clients = {

}

app.get("/", async (req, res) => {
  const qr = await qrcode.toDataURL("https://www.google.com");
  res.send(qr);
  //   console.log(qr);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const ws = new WebSocketServer({ server });
ws.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (values) => {
    const sms = JSON.parse(values);
    clients[sms, paymentId] = socket;
  });
//   socket.send(JSON.stringify({ message: "hi" }));
});
