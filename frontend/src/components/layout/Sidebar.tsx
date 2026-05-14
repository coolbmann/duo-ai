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
    section: "Chat",
    items: [
      { to: "/chat", label: "Current session", icon: "chat" },
      { to: "/sessions", label: "All Sessions", icon: "list" },
    ],
  },
  // {
  //   section: "Automation",
  //   items: [{ to: "/workflows", label: "Workflows", icon: "workflow" }],
  // },
];

export function AppSidebar({ onNewChat }: { onNewChat: () => void }) {
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
            className="inline-flex items-center justify-center shrink-0 border border-[#98D121] w- h-7 rounded-sm p-[2px]"
            style={{
              borderRadius: 7,
            }}
          >
            <img
              src="/duo-logo (1).svg"
              alt="Duo logo"
              style={{ width: "100%", height: "100%" }}
            />
          </span>
          <span>DUO</span>
        </div>
        {/* <SidebarTrigger className="text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent" /> */}
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
              <div className="my-2 bg-sidebar-accent rounded-md">
                <div
                  className="flex gap-2 items-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:cursor-pointer  text-sm px-2 py-2"
                  onClick={() => {
                    onNewChat();
                    navigate("/chat");
                  }}
                >
                  <Plus
                    className="transition-transform duration-150 group-hover:scale-125"
                    size={13}
                    strokeWidth={2.2}
                  />
                  New chat
                </div>
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
            PA
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#E8E8E6", fontWeight: 500 }}>
              Shared Public Account
            </div>
            <div style={{ fontSize: 11, color: "#6B6C70" }}>Made by BH</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
