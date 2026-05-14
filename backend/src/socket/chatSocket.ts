// src/sockets/chat.ts
import { Server } from "socket.io";
import { ChatService } from "../services/ChatService";
import { clearAgentMemory } from "../langgraph/entrypoints/courtAvailabilityAgent";

export function registerChatSocket(io: Server) {
  const chat = io.of("/chat");
  ChatService.init(chat);

  chat.on("connection", (socket) => {
    socket.on("join_room", ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("send_message", ({ chatId, text }) => {
      ChatService.getInstance().handleMessage(chatId, text);
    });

    socket.on("leave_room", ({ chatId }) => {
      clearAgentMemory(chatId);
      socket.leave(chatId);
    });

    socket.on("disconnecting", () => {
      socket.rooms.forEach((chatId) => clearAgentMemory(chatId));
    });
  });
}
