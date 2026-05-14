import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AGENTS } from "@/data";
import { AgentCard } from "./AgentCard";
import { PlusIcon, SearchIcon } from "lucide-react";

export function AgentsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleOpen = (id: string) => {
    if (id === "court-booking") {
      navigate("/agents/court-booking");
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-bg-app">
      <div className="pt-10 px-14">
        <div className="mb-7">
          <h1 className="text-[26px] font-semibold tracking-tight text-text-dark m-0 mb-1.5">
            Agents
          </h1>
          <p className="text-[14px] text-text-mid m-0">
            Specialised agents that handle one job exceptionally well. Call them
            directly from chat.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-[22px]">
          <div className="flex-1 max-w-[360px] flex items-center gap-2 bg-bg-card border border-border-mid rounded-lg px-3 py-2.5 text-[13px] text-text-mid transition-colors focus-within:border-border-mid">
            <SearchIcon className="w-4 h-4" />
            <input
              className="flex-1 border-none outline-none bg-transparent text-[13px]"
              placeholder="Search agents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-3.5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {AGENTS.filter((a) =>
            a.name.toLowerCase().includes(query.toLowerCase()),
          ).map((a) => (
            <AgentCard
              key={a.id}
              {...a}
              comingSoon={["dupr-analysis"].includes(a.id)}
              inactive={a.id === "dupr-analysis"}
              onClick={() => handleOpen(a.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
