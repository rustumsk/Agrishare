import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authSocket = (socket: any, next:any) => {
  const token = socket.handshake.auth.token;

  if (!token){
        socket.disconnect();
        console.log("A user disconnected due to missing token");
        return;
  };

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("user is valid!");
    socket.user = token;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
}