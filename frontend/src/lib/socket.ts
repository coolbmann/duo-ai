import { io } from "socket.io-client";

const createSocket = (namespace: string) =>
  io(`${import.meta.env.VITE_SERVER_URL}${namespace}`, { autoConnect: false });

export const chatSocket = createSocket("/chat");
