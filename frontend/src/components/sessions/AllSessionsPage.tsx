import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SESSIONS } from "@/data";
import { cn } from "@/lib/utils";

const STATUS_TABS = [
  ["all", "All"],
  ["completed", "Completed"],
  ["cancelled", "Cancelled"],
  ["failed", "Failed"],
] as const;

export function AllSessionsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "completed" | "cancelled" | "failed">(
    "all",
  );
  const [query, setQuery] = useState("");

  const filtered = SESSIONS.filter(
    (s) =>
      (tab === "all" || s.status === tab) &&
      (!query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase())),
  );

  const counts = {
    all: SESSIONS.length,
    completed: SESSIONS.filter((s) => s.status === "completed").length,
    cancelled: SESSIONS.filter((s) => s.status === "cancelled").length,
    failed: SESSIONS.filter((s) => s.status === "failed").length,
  };

  return (
    <div className="h-full overflow-y-auto bg-bg-app">
      <div
        className="max-w-[1280px] mx-auto"
        style={{ padding: "36px 44px 80px" }}
      >
        <div className="mb-7">
          <h1 className="text-[26px] font-semibold tracking-tight text-text-dark m-0 mb-1.5">
            All Sessions
          </h1>
          <p className="text-[14px] text-text-mid m-0">
            Every conversation you've had with Duo. Pick up where you left off,
            or view your past chat history
          </p>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="bg-bg-card border border-border-light rounded-xl overflow-hidden">
          <div className="text-center py-12 text-[13px] text-text-light">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}

const FutureComponents = () => {
  return (
    // <>
    //   Toolbar
    //   <div className="flex items-center justify-between gap-3 mb-[22px]">
    //     <div className="flex-1 max-w-[360px] flex items-center gap-2 bg-bg-card border border-border-light rounded-lg px-3 py-2.5 text-[13px] text-text-mid transition-colors focus-within:border-border-mid">
    //       <svg
    //         width={14}
    //         height={14}
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //       >
    //         <circle cx="11" cy="11" r="7" />
    //         <line x1="21" y1="21" x2="16.65" y2="16.65" />
    //       </svg>
    //       <input
    //         className="flex-1 border-none outline-none bg-transparent text-[13px]"
    //         placeholder="Search sessions by title or ref..."
    //         value={query}
    //         onChange={(e) => setQuery(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       onClick={() => navigate("/chat")}
    //       className="bg-text-dark text-white text-[13px] font-medium px-3.5 py-2.5 rounded-lg inline-flex items-center gap-1.5 hover:bg-black transition-colors"
    //     >
    //       <svg
    //         width={14}
    //         height={14}
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth={2.2}
    //         strokeLinecap="round"
    //       >
    //         <line x1="12" y1="5" x2="12" y2="19" />
    //         <line x1="5" y1="12" x2="19" y2="12" />
    //       </svg>
    //       New session
    //     </button>
    //   </div>

    //   {/* Tab strip */}
    //   <div className="flex gap-1 border-b border-border-light mb-[22px]">
    //     {STATUS_TABS.map(([k, label]) => (
    //       <button
    //         key={k}
    //         onClick={() => setTab(k as typeof tab)}
    //         className={`px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
    //           tab === k
    //             ? "text-text-dark border-text-dark"
    //             : "text-text-mid border-transparent hover:text-text-dark"
    //         }`}
    //       >
    //         {label}
    //         <span className="ml-1.5 text-text-light font-normal">
    //           {counts[k as keyof typeof counts]}
    //         </span>
    //       </button>
    //     ))}
    //   </div>

    //   {/* Sessions table */}
    //   <div className="bg-bg-card border border-border-light rounded-xl overflow-hidden">
    //     <div
    //       className="grid gap-4 text-[11px] uppercase tracking-[0.08em] text-text-light font-medium bg-bg-hover border-b border-border-light"
    //       style={{
    //         gridTemplateColumns: "minmax(220px, 2.4fr) 1.4fr 140px",
    //         padding: "12px 18px",
    //       }}
    //     >
    //       <div>Session</div>
    //       <div>Agent</div>
    //       <div>When</div>
    //     </div>

    //     {filtered.length === 0 ? (
    //       <div className="text-center py-12 text-[13px] text-text-light">
    //         No sessions match — try clearing filters.
    //       </div>
    //     ) : (
    //       filtered.map((s) => (
    //         <button
    //           key={s.id}
    //           onClick={() => navigate("/chat")}
    //           className={cn(
    //             "grid gap-4 items-center border-b border-border-light last:border-b-0 text-left w-full cursor-pointer transition-colors hover:bg-bg-hover",
    //           )}
    //           style={{
    //             gridTemplateColumns: "minmax(220px, 2.4fr) 1.4fr 140px",
    //             padding: "14px 18px",
    //           }}
    //         >
    //           <div className="flex flex-col gap-0.5 min-w-0">
    //             <div className="text-[13.5px] font-medium text-text-dark truncate">
    //               {s.title}
    //             </div>
    //             <div
    //               className="text-text-light tracking-[0.04em]"
    //               style={{ fontFamily: "var(--font-mono)", fontSize: 10.5 }}
    //             >
    //               {s.id}
    //             </div>
    //           </div>
    //           <div>
    //             <span
    //               className="inline-flex items-center gap-1.5 text-[12px] text-text-mid bg-bg-app border border-border-light rounded-full"
    //               style={{ padding: "3px 10px 3px 6px" }}
    //             >
    //               <span className="w-[18px] h-[18px] rounded-[5px] bg-[#EDFBC8] inline-flex items-center justify-center text-[11px]">
    //                 🎾
    //               </span>
    //               {s.agent}
    //             </span>
    //           </div>
    //           <div className="text-[12px] text-text-light">{s.when}</div>
    //         </button>
    //       ))
    //     )}
    //   </div>
    // </>

    <></>
  );
};
