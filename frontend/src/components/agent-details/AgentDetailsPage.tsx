import { useNavigate } from "react-router-dom";
import { AGENTS, BOOKING_SYSTEMS } from "@/data";
import { BookingSystemRow } from "./BookingSystemRow";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const iconTileColors: Record<string, string> = {
  lime: "bg-[#EDFBC8] text-[#4A6B11]",
  amber: "bg-[#FEF1D9] text-[#8A5A0E]",
  teal: "bg-[#D1FAF5] text-[#0D6F66]",
  purple: "bg-[#EAE0FE] text-[#5B3DB5]",
  pink: "bg-[#FCE0EE] text-[#9D2461]",
  orange: "bg-[#FEE3D5] text-[#B0461A]",
};

export function AgentDetailsPage() {
  const navigate = useNavigate();
  const agent = AGENTS.find((a) => a.id === "court-booking")!;

  const totalLocations = BOOKING_SYSTEMS.reduce(
    (n, s) => n + s.locations.length,
    0,
  );
  const totalCourts = BOOKING_SYSTEMS.reduce(
    (n, s) => n + s.locations.reduce((c, l) => c + l.courts, 0),
    0,
  );

  return (
    <div className="h-full overflow-y-auto bg-bg-app">
      <div
        className="max-w-[1280px] mx-auto"
        style={{ padding: "36px 44px 80px" }}
      >
        {/* Back link */}
        <button
          onClick={() => navigate("/agents")}
          className="inline-flex items-center gap-1.5 text-[12px] text-text-light font-medium mb-[18px] px-2 py-1 rounded-md transition-colors hover:text-text-dark hover:bg-bg-hover"
        >
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          All agents
        </button>

        {/* Hero */}
        <div
          className="grid items-start gap-[22px] bg-bg-card border border-border-light rounded-2xl mb-[22px]"
          style={{ gridTemplateColumns: "auto 1fr auto", padding: "26px 28px" }}
        >
          <div
            className={`w-14 h-14 rounded-2xl inline-flex items-center justify-center text-[26px] ${iconTileColors[agent.iconColor]}`}
          >
            {agent.icon}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-[22px] font-semibold tracking-tight text-text-dark m-0">
                {agent.name}
              </h1>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
                style={{ color: "#146E3D", background: "#D9F7E5" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-success shadow-[0_0_6px_#3DDB7A]" />
                Active
              </span>
            </div>
            <p className="text-[13.5px] text-text-mid leading-snug m-0 max-w-[620px]">
              {agent.desc}
            </p>
            <div className="flex flex-wrap gap-7 mt-3 pt-3.5 border-t border-dashed border-border-light">
              {[
                { k: "Runs · 30d", v: agent.runs },
                { k: "Triggers", v: agent.triggers },
                { k: "Success rate", v: "98.4%" },
                { k: "Avg. completion", v: "7.2s" },
              ].map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-[10.5px] uppercase tracking-[0.08em] text-text-light font-medium">
                    {k}
                  </span>
                  <span className="text-[14px] font-semibold text-text-dark tabular-nums">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/chat")}
              className="inline-flex items-center gap-2 bg-text-dark text-white px-4 py-2.5 rounded-lg text-[13px] font-medium hover:bg-black transition-colors"
            >
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
              </svg>
              Run in chat
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-bg-hover text-text-mid inline-flex items-center justify-center transition-colors hover:bg-[#EAEAE6] hover:text-text-dark"
              aria-label="Settings"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="booking-systems" className="mb-0">
          <TabsList className="mb-[26px]">
            <TabsTrigger value="booking-systems">Booking systems</TabsTrigger>
          </TabsList>

          <TabsContent value="booking-systems">
            {/* Section header */}
            <div className="flex items-end justify-between gap-3.5 mb-3.5">
              <div>
                <h2 className="text-[16px] font-semibold text-text-dark m-0 mb-1 tracking-tight">
                  Connected booking systems
                </h2>
                <p className="text-[12.5px] text-text-light m-0">
                  {BOOKING_SYSTEMS.length} integrations · {totalLocations}{" "}
                  locations · {totalCourts} courts available to this agent
                </p>
              </div>
            </div>

            {/* Systems list */}
            <div className="flex flex-col gap-3">
              {BOOKING_SYSTEMS.map((s) => (
                <BookingSystemRow key={s.id} system={s} />
              ))}

              <button
                className="flex items-center gap-4 border border-dashed border-border-mid rounded-xl bg-transparent cursor-pointer text-left transition-colors hover:border-text-mid hover:bg-bg-hover"
                style={{ padding: "18px 22px" }}
              >
                <div className="w-10 h-10 rounded-[10px] bg-bg-hover text-text-mid inline-flex items-center justify-center text-[20px]">
                  +
                </div>
                <div>
                  <div className="text-[14px] text-text-dark font-semibold">
                    Connect another booking system
                  </div>
                  <div className="text-[12px] text-text-light mt-0.5">
                    Court Reserve · Skedda · Tennis Booker · custom API
                  </div>
                </div>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
