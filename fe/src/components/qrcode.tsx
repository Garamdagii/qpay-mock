"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export const QRCODE = () => {
  const [qr, setQr] = useState<string>("");
  const [status, setStatus] = useState(null);

  const fetchQRcode = async () => {
    const response = await axios.get("http://localhost:8000");
    setQr(response.data);
  };

  useEffect(() => {
    const ws = new WebSocket(`ws:localhost:8000`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ message: "hello" }));
    };
    console.log(ws, "hello");

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data), event);
    };
  }, []);

  return (
    <div>
      <button onClick={fetchQRcode}>pay</button>
      {qr && <Image width={100} height={100} src={qr} alt="qrcode" />}
    </div>
  );
};
