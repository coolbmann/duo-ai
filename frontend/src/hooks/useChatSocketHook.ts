import { useEffect, useState, useCallback } from "react";
import { chatSocket } from "@/lib/socket";
import type { Message } from "@/components/chat/ChatPage";

// Module-level cache — survives navigation, cleared when chatId changes
const messageCache = new Map<string, Message[]>();

function getMessages(chatId: string): Message[] {
  return messageCache.get(chatId) ?? [];
}

function setMessages(chatId: string, updater: (prev: Message[]) => Message[]) {
  const next = updater(getMessages(chatId));
  messageCache.set(chatId, next);
  return next;
}

export function useChatSocket(chatId: string) {
  const [chatMessages, setChatMessages] = useState<Message[]>(() => getMessages(chatId));

  const update = useCallback((updater: (prev: Message[]) => Message[]) => {
    setChatMessages(setMessages(chatId, updater));
  }, [chatId]);

  useEffect(() => {
    // Restore any cached messages when returning to the same chatId
    setChatMessages(getMessages(chatId));

    chatSocket.connect();

    chatSocket.on("connect", () => {
      chatSocket.emit("join_room", { chatId });
    });

    chatSocket.on("server_message", ({ text }) => {
      update((prev) => [
        ...prev,
        { kind: "agent", text, agent: "COURT BOOKING AGENT" },
      ]);
    });

    return () => {
      chatSocket.emit("leave_room", { chatId });
      chatSocket.off("connect");
      chatSocket.off("server_message");
      chatSocket.disconnect();
    };
  }, [chatId, update]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    update((prev) => [...prev, { kind: "user", text }]);
    chatSocket.emit("send_message", { chatId, text });
  };

  return { chatMessages, sendMessage };
}
