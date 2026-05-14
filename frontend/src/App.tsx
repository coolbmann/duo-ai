import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { AgentsPage } from "@/components/agents/AgentsPage";
import { AgentDetailsPage } from "@/components/agent-details/AgentDetailsPage";
import { WorkflowsPage } from "@/components/workflows/WorkflowsPage";
import { AllSessionsPage } from "@/components/sessions/AllSessionsPage";
import { ChatPage } from "@/components/chat/ChatPage";
import { RequestModal } from "@/components/feedback/RequestModal";

const CHAT_ID_KEY = "duo_chat_id";

function getOrCreateChatId(): string {
  const existing = sessionStorage.getItem(CHAT_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(CHAT_ID_KEY, id);
  return id;
}

function generateChatId(): string {
  const id = crypto.randomUUID();
  sessionStorage.setItem(CHAT_ID_KEY, id);
  return id;
}

function Layout() {
  const [chatId, setChatId] = useState(() => getOrCreateChatId());

  const handleNewChat = () => setChatId(generateChatId());

  return (
    <SidebarProvider>
      <AppSidebar onNewChat={handleNewChat} />
      <SidebarInset className="overflow-y-auto min-h-0 h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/court-booking" element={<AgentDetailsPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/sessions" element={<AllSessionsPage />} />
          <Route
            path="/chat"
            element={<ChatPage key={chatId} chatId={chatId} />}
          />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <RequestModal />
    </BrowserRouter>
  );
}

export default App;
