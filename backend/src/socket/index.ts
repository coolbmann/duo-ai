// src/sockets/index.ts
import { Server } from "socket.io";
import { registerChatSocket } from "./chatSocket";

export function registerSockets(io: Server) {
  registerChatSocket(io);
}
