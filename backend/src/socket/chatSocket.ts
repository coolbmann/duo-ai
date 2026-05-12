// src/sockets/chat.ts
import { Server } from "socket.io";

export function registerChatSocket(io: Server) {
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    socket.on("join_room", ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("send_message", ({ chatId, text }) => {
      console.log("send_message", chatId, text);
      chat.to(chatId).emit("message_received", { text: `${text} from server` });
    });

    socket.on("leave_room", ({ chatId }) => {
      socket.leave(chatId);
    });
  });
}
