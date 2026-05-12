import { io } from "socket.io-client";

const createSocket = (namespace: string) =>
  io(`http://localhost:3000${namespace}`, { autoConnect: false });

export const chatSocket = createSocket("/chat");
