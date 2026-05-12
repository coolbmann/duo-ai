import { useEffect, useState } from "react";
import { chatSocket } from "@/lib/socket";
import type { Message } from "@/components/chat/ChatPage";

export function useChatSocket(chatId: string) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log("useChatSocket", chatId);
    chatSocket.connect();

    chatSocket.on("connect", () => {
      chatSocket.emit("join_room", { chatId });
    });

    chatSocket.on("server_message", ({ text }) => {
      setChatMessages((prev) => [
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
  }, [chatId]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { kind: "user", text }]);
    chatSocket.emit("send_message", { chatId, text });
  };

  return { chatMessages, sendMessage };
}
