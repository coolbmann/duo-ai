import type { FeedLine } from "@/data";
import { useRef, useEffect } from "react";

interface RailFeedProps {
  lines: FeedLine[];
}

export function RailFeed({ lines }: RailFeedProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines.length]);

  return (
    <div className="bg-bg-app border border-border-light rounded-[10px] p-[14px_16px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-light mb-3">
        Agent Activity
      </div>
      <div
        ref={ref}
        className="flex flex-col gap-1"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          maxHeight: 240,
          overflowY: "auto",
        }}
      >
        {lines.length === 0 ? (
          <div className="text-text-light text-[11px]">
            Idle. Start a chat to see agents work.
          </div>
        ) : (
          lines.map((l, i) => {
            const marker =
              l.status === "done"
                ? "✓"
                : l.status === "error"
                  ? "✗"
                  : l.status === "active"
                    ? "▶"
                    : "○";
            return (
              <div
                key={i}
                className="grid items-baseline gap-2 py-px animate-fade-in"
                style={{ gridTemplateColumns: "14px 1fr auto" }}
              >
                <span
                  className="text-[10px]"
                  style={{
                    color:
                      l.status === "done"
                        ? "#3DDB7A"
                        : l.status === "active"
                          ? "#2D6FF5"
                          : "#8A8A85",
                  }}
                >
                  {marker}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[9.5px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: "#2DD4BF", fontFamily: "var(--font-sans)" }}
                  >
                    {l.agent}
                  </span>
                  <span
                    className="text-[11px] text-text-mid truncate"
                    style={{
                      color: l.status === "done" ? "#1A1A1A" : undefined,
                    }}
                  >
                    {l.msg}
                  </span>
                </div>
                <span className="text-[10px] text-text-light tabular-nums">
                  {l.dur ? `${l.dur}ms` : ""}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

type Stage =
  | "idle"
  | "intent"
  | "discover"
  | "select"
  | "coordinate"
  | "notify"
  | "done";

interface RailWorkflowProps {
  stage: Stage;
}

const STEPS = [
  { id: "intent", label: "Intent parsed" },
  { id: "discover", label: "Courts found" },
  { id: "select", label: "Timeslot selection" },
  { id: "coordinate", label: "Booking coordination" },
  // { id: 'notify', label: 'Group notification' },
  { id: "done", label: "Done" },
];
const ORDER: Stage[] = [
  "idle",
  "intent",
  "discover",
  "select",
  "coordinate",
  "notify",
  "done",
];

export function RailWorkflow({ stage }: RailWorkflowProps) {
  const idx = ORDER.indexOf(stage);

  return (
    <div className="bg-bg-app border border-border-light rounded-[10px] p-[14px_16px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-light mb-3">
        Workflow State
      </div>
      <div className="flex flex-col gap-2.5">
        {STEPS.map((s, i) => {
          const stepIdx = i + 1;
          const status =
            stepIdx < idx ? "done" : stepIdx === idx ? "active" : "pending";
          const ico = status === "done" ? "✓" : status === "active" ? "→" : "○";
          return (
            <div
              key={s.id}
              className="flex items-center gap-2.5"
              style={{
                fontSize: 12.5,
                color: status === "active" ? "#1A1A1A" : "#5C5C5C",
                fontWeight: status === "active" ? 500 : 400,
              }}
            >
              <span
                className="w-4 h-4 inline-flex items-center justify-center text-[11px]"
                style={{
                  color:
                    status === "done"
                      ? "#3DDB7A"
                      : status === "active"
                        ? "#2D6FF5"
                        : "#D6D6D2",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {ico}
              </span>
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RailMemory() {
  const entries = [
    { k: "Usual day", v: "Saturday" },
    { k: "Usual time", v: "10:00 – 12:00" },
    { k: "Fav court", v: "Redfern PC" },
    { k: "Group", v: "Dan, Priya, +3" },
  ];

  return (
    <div className="bg-bg-app border border-border-light rounded-[10px] p-[14px_16px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-light mb-3">
        Your Preferences
      </div>
      <div className="grid gap-y-2" style={{ gridTemplateColumns: "90px 1fr" }}>
        {entries.map(({ k, v }) => (
          <>
            <div
              key={k + "-k"}
              className="text-[11px] uppercase tracking-[0.06em] text-text-light font-medium self-center"
            >
              {k}
            </div>
            <div
              key={k + "-v"}
              className="text-[13px] text-text-dark font-medium"
            >
              {v}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
