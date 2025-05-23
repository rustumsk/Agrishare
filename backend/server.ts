import app from "./src/app";
import { Server } from "socket.io";
import http from "http";
import * as dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authSocket } from "./src/middlewares/auth/socket.middlware";
dotenv.config();
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./src/config/types/types";

const server = http.createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
    const user = (socket as any).user;
    console.log(`A user connected: ${user}`);

    socket.on("joinRoom", (roomId) =>{
      socket.join(roomId);
    });
    socket.on('sendMessage', (msg) => {
      io.to(msg.roomId).emit('newMessage', msg);
    });
    socket.on('notify', (data) => {
      const {receiver_id, type} = data;
      console.log(receiver_id, type);
      console.log("Notify")
      io.to(receiver_id).emit('notification', {
        type: type,
        time: new Date().toISOString(),
      });
   });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(process.env.PORT, () => {
  console.log(`HTTP + Socket.IO server running on port ${process.env.PORT}`);
});