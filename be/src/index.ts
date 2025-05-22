import express from "express";
import cors from "cors";
import qrcode from "qrcode";
import { WebSocketServer } from "ws";
import { v4 } from "uuid";

const app = express();
app.use(cors());
const port = 8000;

type qrsType = {
  [key: string]: boolean;
};
type indexKey = string | number;
type clientsValue = string | BinaryType;

type clientsType = {
  [key: indexKey]: clientsValue;
};

const qrs: qrsType = {};
const clients: clientsType = {};

app.get("/", async (req, res) => {
  const id = v4();
  const qr = await qrcode.toDataURL(`http://localhost:8000/scanqr?id=${id}`);
  qrs[id] = false;
  res.send({ qr, id });
  console.log(typeof id);
});

app.get("/scanqr", (req, res) => {
  const { id } = req.query;
  clients[id].send(JSON.stringify({ status: true }));
  res.send("qr scanned");
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const ws = new WebSocketServer({ server });
ws.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (values) => {
    const sms = JSON.parse(values.toString());
    clients[sms.paymentId] = socket;
  });
});
