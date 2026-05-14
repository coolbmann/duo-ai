import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const iconTileColors: Record<string, string> = {
  lime: "bg-[#EDFBC8] text-[#4A6B11]",
  amber: "bg-[#FEF1D9] text-[#8A5A0E]",
  teal: "bg-[#D1FAF5] text-[#0D6F66]",
  purple: "bg-[#EAE0FE] text-[#5B3DB5]",
  pink: "bg-[#FCE0EE] text-[#9D2461]",
  orange: "bg-[#FEE3D5] text-[#B0461A]",
};

interface AgentCardProps {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconColor: string;
  runs: number;
  triggers: string;
  comingSoon?: boolean;
  inactive?: boolean;
  onClick: () => void;
}

export function AgentCard({
  name,
  desc,
  icon,
  iconColor,
  runs,
  triggers,
  comingSoon,
  inactive,
  onClick,
}: AgentCardProps) {
  return (
    <div
      onClick={comingSoon ? undefined : onClick}
      className={cn(
        "relative bg-bg-card border border-solid border-border-light rounded-xl p-5 flex flex-col gap-3.5 text-left transition-all duration-200",
        comingSoon
          ? "cursor-default opacity-100"
          : "cursor-pointer hover:-translate-y-px hover:border-border-mid hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]",
      )}
    >
      {comingSoon && (
        <Badge
          className="absolute top-3 right-3 border-transparent"
          style={{ background: "#B5F23D", color: "#0D0F0E" }}
        >
          Coming Soon
        </Badge>
      )}
      <div
        className={cn(
          "w-[42px] h-[42px] rounded-[10px] inline-flex items-center justify-center text-[20px]",
          iconTileColors[iconColor],
        )}
      >
        {icon}
      </div>
      <div>
        <div className="text-[15px] font-semibold text-text-dark">{name}</div>
        <div className="text-[13px] text-text-mid leading-snug mt-1">
          {desc}
        </div>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-text-light mt-auto pt-2.5 border-t border-border-light">
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            inactive
              ? "bg-text-light"
              : "bg-accent-success shadow-[0_0_6px_#3DDB7A]",
          )}
        />
        <span>{inactive ? "Inactive" : "Active"}</span>
        <span className="text-border-mid">·</span>
        <span>{triggers}</span>
      </div>
      <div className="flex justify-between items-center text-[12px]">
        <span className="text-text-mid font-medium">
          {runs} queries this month
        </span>
        {!inactive && (
          <span className="text-brand font-medium flex items-center gap-1">
            Open <span>→</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function AddAgentCard({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-dashed border-border-mid rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer text-text-mid min-h-[200px] transition-all hover:bg-bg-hover hover:border-text-mid hover:text-text-dark"
    >
      <div className="w-9 h-9 rounded-full bg-bg-hover inline-flex items-center justify-center text-[18px]">
        +
      </div>
      <div className="font-semibold">Build a new agent</div>
      <div className="text-[12px] text-text-light">
        Describe what you want it to do
      </div>
    </button>
  );
}
