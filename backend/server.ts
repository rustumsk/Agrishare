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

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
  }
});

io.use(authSocket as any);

io.on("connection", (socket) => {
    const user = (socket as any).user;
    console.log(`A user connected: ${user}`);
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(process.env.PORT, () => {
  console.log(`HTTP + Socket.IO server running on port ${process.env.PORT}`);
});