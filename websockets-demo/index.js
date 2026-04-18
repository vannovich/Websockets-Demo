// import { request } from "node:http";
import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8000 });

// Connection Event
ws.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });

    ws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`Server Broadcast : ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.log(`Error: ${err}: ${ip}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("Websocket Server is live on ws://localhost:8000");
