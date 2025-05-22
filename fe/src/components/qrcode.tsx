"use client";

import axios from "axios";
import { watch } from "fs";
import Image from "next/image";
import { useEffect, useState } from "react";

export const QRCODE = () => {
  const [qr, setQr] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [paymentId, setPaymentId] = useState(null);

  const generateQRcode = async () => {
    const { data } = await axios.get("http://localhost:8000");
    setQr(data.qr);
    setPaymentId(data.id);
  };

  useEffect(() => {
    if (!paymentId) return;
    const ws = new WebSocket(`ws:localhost:8000`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "listen", paymentId }));
    };
    console.log(ws, "hello");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status) {
        setStatus("payment success");
        ws.close();
      }
    };
  }, [paymentId]);

  return (
    <div>
      <button onClick={generateQRcode}>pay</button>
      {qr && <Image width={100} height={100} src={qr} alt="qrcode" />}
    </div>
  );
};
