import React, { useEffect } from "react";
import { TOKEN } from "@/utils/config/token";

const WebSocketComponent: React.FC = () => {
  useEffect(() => {
    const token = TOKEN.getAccessToken() ?? "";

    const socketUrl = `wss://gas-station.aralhub.uz/ws/user/gas-stations/?token=${token}`;

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket соединение установлено");
    };

    socket.onmessage = (event) => {
      console.log("Получено сообщение от сервера:", event.data);
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket соединение закрыто", event.reason);
    };

    return () => {
      socket.close();
    };
  }, []);

  return <div>WebSocket</div>;
};

export default WebSocketComponent;
