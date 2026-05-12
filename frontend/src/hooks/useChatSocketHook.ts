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

    chatSocket.on("message_received", ({ text }) => {
      setChatMessages((prev) => [
        ...prev,
        { kind: "agent", text, agent: "COORDINATOR AGENT" },
      ]);
    });

    return () => {
      chatSocket.emit("leave_room", { chatId });
      chatSocket.off("connect");
      chatSocket.off("message_received");
      chatSocket.disconnect();
    };
  }, [chatId]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { kind: "user", text }]); // ← append user msg here
    chatSocket.emit("send_message", { chatId, text });
  };

  return { chatMessages, sendMessage };
}
