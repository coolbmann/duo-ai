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
    setChatMessages(getMessages(chatId));

    chatSocket.connect();

    const handleConnect = () => {
      chatSocket.emit("join_room", { chatId });
    };

    if (chatSocket.connected) {
      chatSocket.emit("join_room", { chatId });
    }

    const handleServerMessage = ({ chatId: incomingChatId, text }: { chatId: string; text: string }) => {
      if (incomingChatId !== chatId) return;
      update((prev) => [
        ...prev,
        { kind: "agent", text, agent: "COURT BOOKING AGENT" },
      ]);
    };

    chatSocket.on("connect", handleConnect);
    chatSocket.on("server_message", handleServerMessage);

    return () => {
      chatSocket.emit("leave_room", { chatId });
      chatSocket.off("connect", handleConnect);
      chatSocket.off("server_message", handleServerMessage);
    };
  }, [chatId, update]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    update((prev) => [...prev, { kind: "user", text }]);
    chatSocket.emit("send_message", { chatId, text });
  };

  return { chatMessages, sendMessage };
}
