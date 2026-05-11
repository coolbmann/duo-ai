import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Bot, Workflow, MessageSquare, List, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const NAV_ICONS = {
  agents: Bot,
  workflow: Workflow,
  chat: MessageSquare,
  list: List,
} as const;

type NavItem = {
  to: string;
  label: string;
  icon: keyof typeof NAV_ICONS;
  pill?: string;
};

const NAV_SECTIONS: { section: string; items: NavItem[] }[] = [
  {
    section: "Agents",
    items: [{ to: "/agents", label: "All Agents", icon: "agents" }],
  },
  {
    section: "Automation",
    items: [{ to: "/workflows", label: "Workflows", icon: "workflow" }],
  },
  {
    section: "Chat",
    items: [
      { to: "/chat", label: "New session", icon: "chat", pill: "LIVE" },
      { to: "/sessions", label: "All Sessions", icon: "list" },
    ],
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3">
        <div
          className="flex items-center gap-2.5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            letterSpacing: "0.1em",
            color: "#E8E8E6",
          }}
        >
          <span
            className="inline-flex items-center justify-center text-sb-bg"
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "linear-gradient(135deg, #B5F23D, #2DD4BF)",
              fontFamily: "var(--font-display)",
              fontSize: 14,
              letterSpacing: 0,
            }}
          >
            D
          </span>
          <span>DUO</span>
        </div>
        <SidebarTrigger className="text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent" />
      </SidebarHeader>

      <SidebarContent>
        {NAV_SECTIONS.map((sec) => (
          <SidebarGroup key={sec.section}>
            <SidebarGroupLabel className="text-sidebar-foreground/40 text-[11px] font-medium tracking-wide px-3">
              {sec.section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sec.items.map((item) => {
                  const ItemIcon = NAV_ICONS[item.icon];
                  const isActive =
                    pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        render={<NavLink to={item.to} />}
                        isActive={isActive}
                        className="gap-3"
                      >
                        <ItemIcon size={16} strokeWidth={1.8} />
                        <span>{item.label}</span>
                        {item.pill && (
                          <span
                            className="ml-auto font-semibold"
                            style={{
                              fontSize: 9.5,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              background: "#B5F23D",
                              color: "#0D0F0E",
                              padding: "2px 6px",
                              borderRadius: 4,
                            }}
                          >
                            {item.pill}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            {sec.section === "Chat" && (
              <div className="px-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-dashed border-sidebar-border bg-transparent text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:border-sidebar-border"
                  onClick={() => navigate("/chat")}
                >
                  <Plus size={13} strokeWidth={2.2} />
                  New chat
                </Button>
              </div>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="inline-flex items-center justify-center rounded-full text-white font-semibold shrink-0"
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #F5A623, #FF7A4A)",
              fontSize: 12,
            }}
          >
            JS
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#E8E8E6", fontWeight: 500 }}>
              Jamie Singh
            </div>
            <div style={{ fontSize: 11, color: "#6B6C70" }}>
              Redfern Crew · Free
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
