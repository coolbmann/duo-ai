import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/Sidebar'
import { AgentsPage } from '@/components/agents/AgentsPage'
import { AgentDetailsPage } from '@/components/agent-details/AgentDetailsPage'
import { WorkflowsPage } from '@/components/workflows/WorkflowsPage'
import { AllSessionsPage } from '@/components/sessions/AllSessionsPage'
import { ChatPage } from '@/components/chat/ChatPage'

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden min-h-0 h-full">
        <Routes>
          <Route path="/" element={<Navigate to="/agents" replace />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/court-booking" element={<AgentDetailsPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/sessions" element={<AllSessionsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
