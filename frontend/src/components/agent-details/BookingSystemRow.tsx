const logoGradients: Record<string, string> = {
  teal: "linear-gradient(135deg, #0D6F66, #2DD4BF)",
  orange: "linear-gradient(135deg, #B0461A, #FF7A4A)",
  purple: "linear-gradient(135deg, #5B3DB5, #8B5CF6)",
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
}

export function BookingSystemRow({ system }: BookingSystemRowProps) {
  return (
    <div
      className="bg-bg-card border border-border-light rounded-xl flex flex-col gap-3.5 transition-all hover:border-border-mid hover:shadow-[0_6px_16px_rgba(0,0,0,0.03)]"
      style={{ padding: "18px 20px" }}
    >
      {/* Head */}
      <div
        className="grid items-center gap-[18px]"
        style={{ gridTemplateColumns: "auto 1fr auto auto auto" }}
      >
        <div
          className="inline-flex items-center justify-center text-white rounded-[10px]"
          style={{
            width: 40,
            height: 40,
            background: logoGradients[system.logoColor],
            fontFamily: "var(--font-display)",
            fontSize: 18,
            letterSpacing: "0.04em",
          }}
        >
          {system.logoMark}
        </div>

        <div className="flex flex-col gap-[3px] min-w-0">
          <div className="text-[15px] font-semibold text-text-dark">
            {system.name}
          </div>
          <div className="text-[12px] text-text-light">{system.type}</div>
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]"
          style={{ color: "#146E3D" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-success shadow-[0_0_6px_#3DDB7A]" />
          Connected
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
          <button
            className="inline-flex items-center gap-1.5 rounded-full text-text-light transition-colors hover:border-text-mid hover:text-text-dark hover:bg-bg-card cursor-pointer"
            style={{
              fontSize: 12.5,
              padding: "5px 11px 5px 9px",
              border: "1px dashed #D6D6D2",
              background: "transparent",
            }}
          >
            <svg
              width={10}
              height={10}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add location
          </button>
        </div>
      </div>
    </div>
  );
}
