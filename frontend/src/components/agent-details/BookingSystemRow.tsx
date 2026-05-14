import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { requestModalStore } from "@/store/requestModal";
import voyagerLogo from "@/assets/voyager_logo.png";
import playtomicLogo from "@/assets/playtomic_logo.jpeg";
import playbypointLogo from "@/assets/playbypoint_logo.png";

const logoImages: Record<string, string> = {
  voyager: voyagerLogo,
  playtomic: playtomicLogo,
  playbypoint: playbypointLogo,
};

interface Location {
  name: string;
  courts: number;
}

interface BookingSystem {
  id: string;
  name: string;
  type: string;
  logoMark: string;
  logoColor: "teal" | "orange" | "purple";
  status: string;
  lastSync: string;
  locations: Location[];
}

interface BookingSystemRowProps {
  system: BookingSystem;
  comingSoon?: boolean;
}

export function BookingSystemRow({
  system,
  comingSoon,
}: BookingSystemRowProps) {
  return (
    <div
      className="relative bg-bg-card border border-border-light rounded-xl flex flex-col gap-3.5 transition-all hover:border-border-mid hover:shadow-[0_6px_16px_rgba(0,0,0,0.03)]"
      style={{ padding: "18px 20px" }}
    >
      {/* Head */}
      <div
        className="grid items-center gap-[18px]"
        style={{ gridTemplateColumns: "auto 1fr auto auto auto" }}
      >
        <div
          className="inline-flex items-center justify-center rounded-[10px] overflow-hidden  bg-white"
          style={{ width: 40, height: 40 }}
        >
          <img
            src={logoImages[system.id]}
            alt={system.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-[3px] min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-[15px] font-semibold text-text-dark">
              {system.name}
            </div>
            {comingSoon && (
              <Badge
                className="border-transparent"
                style={{ background: "#B5F23D", color: "#0D0F0E" }}
              >
                Coming Soon
              </Badge>
            )}
          </div>
          <div className="text-[12px] text-text-light">{system.type}</div>
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]"
          style={{ color: comingSoon ? "#8A8A85" : "#146E3D" }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${comingSoon ? "bg-text-light" : "bg-accent-success shadow-[0_0_6px_#3DDB7A]"}`}
          />
          {comingSoon ? "Not Connected" : "Connected"}
        </div>

        <div className="flex gap-6 pl-[18px] border-l border-border-light">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-[0.08em] text-text-light font-medium">
              Locations
            </span>
            <span className="text-[13px] text-text-dark font-medium tabular-nums">
              {system.locations.length}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-[0.08em] text-text-light font-medium">
              Last Accessed
            </span>
            <span className="text-[13px] text-text-dark font-medium tabular-nums">
              {system.lastSync}
            </span>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="flex items-start gap-4 pt-3.5 border-t border-dashed border-border-light">
        <div
          className="text-text-light font-medium uppercase tracking-[0.08em] pt-1.5 shrink-0"
          style={{ fontSize: 10.5, minWidth: 130 }}
        >
          Locations configured
        </div>
        <div className="flex flex-wrap gap-1.5">
          {system.locations.map((loc) => (
            <span
              key={loc.name}
              className="inline-flex items-center gap-1.5 bg-bg-app border border-border-light rounded-full font-medium text-text-dark transition-colors hover:border-border-mid hover:bg-bg-card cursor-default"
              style={{ fontSize: 12.5, padding: "5px 11px 5px 9px" }}
            >
              <svg
                width={11}
                height={11}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-text-light shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {loc.name}
              <span
                className="bg-bg-hover text-text-mid font-semibold tabular-nums"
                style={{
                  fontSize: 10.5,
                  padding: "1px 6px",
                  borderRadius: 999,
                }}
              >
                {loc.courts}
              </span>
            </span>
          ))}
          <div
            className="inline-flex bg-white border border-dashed border-border-mid items-center gap-1.5 rounded-full text-text-dark transition-colors hover:border-text-mid hover:text-white hover:bg-text-dark cursor-pointer hover:border-solid"
            style={{
              fontSize: 12.5,
              padding: "5px 11px 5px 9px",
            }}
            onClick={() => requestModalStore.open()}
          >
            <PlusIcon className="w-3 h-3" />
            Request location
          </div>
        </div>
      </div>
    </div>
  );
}
