// src/services/ChatService.ts
import { Namespace } from "socket.io";
import { courtAvailabilityAgent } from "../langgraph/entrypoints/courtAvailabilityAgent";
import { HumanMessage } from "@langchain/core/messages";

export class ChatService {
  private static instance: ChatService;
  private chat: Namespace;

  private constructor(chat: Namespace) {
    this.chat = chat;
  }

  static init(chat: Namespace): void {
    ChatService.instance = new ChatService(chat);
  }

  static getInstance(): ChatService {
    if (!ChatService.instance) throw new Error("ChatService not initialized");
    return ChatService.instance;
  }

  sendMessage(chatId: string, text: string) {
    console.log("server_message", chatId, text);
    this.chat.to(chatId).emit("server_message", { chatId, text });
  }

  public async handleMessage(chatId: string, text: string) {
    const config = { configurable: { thread_id: chatId } };
    const response = await courtAvailabilityAgent.invoke(
      [new HumanMessage(text)],
      config,
    );

    this.sendMessage(chatId, response.aiResponse);
  }
}
