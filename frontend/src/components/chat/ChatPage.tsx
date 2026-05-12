import { useState, useRef, useEffect } from "react";
import { type FeedLine } from "@/data";
import { RailFeed, RailWorkflow, RailMemory } from "./ChatRail";
import { useChatSocket } from "@/hooks/useChatSocketHook";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Stage =
  | "idle"
  | "intent"
  | "discover"
  | "select"
  | "coordinate"
  | "notify"
  | "done";

export type Message =
  | { kind: "user"; text: string }
  | { kind: "agent"; text: string; agent: string }
  | { kind: "system"; text: string }
  | { kind: "court-card" }
  | { kind: "boarding-pass" }
  | { kind: "confirmed" };

const TYPING_LINES = {
  parse:
    "Got it — Saturday morning, pickleball, your usual crew. Let me find some courts.",
  selected: "Nice pick. Locking it in and lining up the group send.",
  sent: "Done. Email's out, court's held, you're set for Saturday.",
};

function useTypewriter(text: string, speed = 16, run = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, run, speed]);
  return out;
}

function AgentTyping() {
  return (
    <div
      className="self-start border-l-2 border-brand"
      style={{ padding: "2px 0 2px 14px", maxWidth: "85%" }}
    >
      <div
        className="text-[11px] font-medium text-brand mb-1.5 flex items-center gap-1.5 uppercase tracking-[0.06em]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <span>COORDINATOR AGENT</span>
        <span className="text-border-mid">·</span>
        <span className="text-text-light font-normal normal-case tracking-normal">
          just now
        </span>
      </div>
      <span className="text-[14px] text-text-dark leading-6 flex items-center gap-0.5">
        Agent is working
        <span className="inline-flex gap-[3px] ml-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-text-dark animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </span>
    </div>
  );
}

function StreamingMessage({
  text,
  agent = "COORDINATOR AGENT",
  done,
}: {
  text: string;
  agent?: string;
  done: boolean;
}) {
  const out = useTypewriter(text, 10, !done);
  const isTyping = !done && out.length < text.length;
  return (
    <div
      className="self-start border-l-2 border-brand"
      style={{ padding: "2px 0 2px 14px", maxWidth: "85%" }}
    >
      <div
        className="text-[11px] font-medium text-brand mb-1.5 flex items-center gap-1.5 uppercase tracking-[0.06em]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <span>{agent}</span>
        <span className="text-border-mid">·</span>
        <span className="text-text-light font-normal normal-case tracking-normal">
          just now
        </span>
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p
              className={`text-[14px] text-text-dark leading-6 m-0 [&+p]:mt-2 ${isTyping ? "cursor-blink" : ""}`}
            >
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-2 hover:opacity-75 transition-opacity"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="text-[14px] text-text-dark leading-snug">
              {children}
            </li>
          ),
        }}
      >
        {done ? text : out}
      </ReactMarkdown>
    </div>
  );
}

export function ChatPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [feed, setFeed] = useState<FeedLine[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const { chatMessages, sendMessage } = useChatSocket("123");

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;

    sendMessage(t);
    setInput("");

    // runDemo(t)
  };

  function runDemo(text: string) {
    // sendMessage(text);
    // setMessages((prev) => [...prev, { kind: "user", text }]);
  }

  return (
    <div
      className="grid h-full bg-bg-app"
      style={{ gridTemplateColumns: "1fr 320px" }}
    >
      {/* Main chat area */}
      <div className="flex flex-col overflow-hidden border-r border-border-light">
        {/* Topbar */}
        <div
          className="flex items-center justify-between bg-bg-card border-b border-border-light shrink-0"
          style={{ padding: "14px 24px", height: 60 }}
        >
          <div className="flex items-center gap-2.5 font-semibold text-[14px]">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
            </svg>
            <span>New session</span>
            <span className="text-[13px] text-text-light font-normal">
              · Pickleball booking
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-text-mid">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border-light rounded-full text-[11px] bg-bg-card">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-success" />5
              agents online
            </span>
          </div>
        </div>

        {/* Messages / Empty state */}
        {chatMessages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div
              className="text-[36px] font-bold tracking-tight text-text-dark mb-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              Where + when do you want to{" "}
              <span className="text-brand">play?</span>
            </div>
            <div className="text-[14px] text-text-mid max-w-[380px] text-center leading-relaxed mb-[22px]">
              Tell me, and I'll find a court, line up your crew, and split the
              bill.
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() =>
                  runDemo("Book my usual Saturday morning game with the crew")
                }
                className="text-[12px] text-text-mid bg-bg-card border border-border-light rounded-full px-3.5 py-1.5 transition-all font-medium hover:border-text-dark hover:text-text-dark"
              >
                Book my usual game
              </button>
              <button
                onClick={() =>
                  runDemo(
                    "Find a court Saturday around 10am near Redfern, 4 players",
                  )
                }
                className="text-[12px] text-text-mid bg-bg-card border border-border-light rounded-full px-3.5 py-1.5 transition-all font-medium hover:border-text-dark hover:text-text-dark"
              >
                Saturday 10am, Redfern
              </button>
              <button
                onClick={() => runDemo("I'm free this weekend — surprise me")}
                className="text-[12px] text-text-mid bg-bg-card border border-border-light rounded-full px-3.5 py-1.5 transition-all font-medium hover:border-text-dark hover:text-text-dark"
              >
                Surprise me
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto flex flex-col gap-[18px] bg-bg-app"
            style={{ padding: "28px 32px 24px" }}
          >
            {chatMessages.map((m, i) => {
              if (m.kind === "user") {
                return (
                  <div
                    key={i}
                    className="self-end bg-text-dark text-white rounded-[14px_14px_4px_14px] text-[14px] leading-snug max-w-[70%]"
                    style={{ padding: "11px 16px" }}
                  >
                    {m.text}
                  </div>
                );
              }
              if (m.kind === "agent") {
                const isLast = i === chatMessages.length - 1;
                return (
                  <StreamingMessage
                    key={i}
                    text={m.text}
                    agent={m.agent}
                    done={!isLast}
                  />
                );
              }
              if (m.kind === "system") {
                return (
                  <div
                    key={i}
                    className="self-center text-[11px] text-text-light uppercase tracking-[0.12em]"
                  >
                    {m.text}
                  </div>
                );
              }
              // if (m.kind === "court-card") {
              //   return (
              //     <CourtCard
              //       key={i}
              //       selectedId={selectedCourt}
              //       onSelect={setSelectedCourt}
              //       onConfirm={onConfirmCourt}
              //       locked={courtLocked}
              //     />
              //   );
              // }
              // if (m.kind === "boarding-pass") {
              //   return (
              //     <BoardingPass
              //       key={i}
              //       booking={booking}
              //       draft={draft}
              //       onApprove={onApprove}
              //       onCancel={onCancel}
              //       locked={bookingSent}
              //       onEditDraft={() => {
              //         const next = window.prompt("Edit draft:", draft);
              //         if (next != null) setDraft(next);
              //       }}
              //     />
              //   );
              // }
              // if (m.kind === "confirmed") {
              //   return (
              //     <ConfirmedCard
              //       key={i}
              //       court={booking.court}
              //       date={booking.date}
              //     />
              //   );
              // }
              return null;
            })}
            {chatMessages[chatMessages.length - 1]?.kind === "user" && (
              <AgentTyping />
            )}
          </div>
        )}

        {/* Composer */}
        <div className="shrink-0" style={{ padding: "14px 32px 22px" }}>
          <form
            onSubmit={onSubmit}
            className={`flex items-stretch gap-2 bg-bg-card border border-border-light rounded-xl px-3.5 py-1.5 transition-all focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(45,111,245,0.08)] ${false ? "opacity-60 pointer-events-none" : ""}`}
          >
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-[14px] py-2.5 px-1 text-text-dark placeholder:text-text-light"
              placeholder={"Where and when do you want to play?"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-lg bg-brand text-white flex items-center justify-center self-center transition-colors hover:bg-brand-hover disabled:bg-bg-hover disabled:text-text-light"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
          <div className="flex justify-between px-1.5 pt-2 text-[11px] text-text-light">
            <span>Talk to Duo · 5 agents on standby</span>
            <span>
              <kbd
                className="bg-bg-card border border-border-light rounded px-1 py-px text-[10px]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ↵
              </kbd>{" "}
              send
            </span>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside
        className="bg-bg-card flex flex-col overflow-y-auto gap-4"
        style={{ padding: "18px 18px 24px" }}
      >
        <RailFeed lines={feed} />
        <RailWorkflow stage={stage} />
        <RailMemory />
      </aside>
    </div>
  );
}
