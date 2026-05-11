interface ConfirmedCardProps {
  court: string
  date: string
}

export function ConfirmedCard({ court, date }: ConfirmedCardProps) {
  return (
    <div className="bg-bg-card border border-accent-success rounded-xl p-[18px_22px] flex items-center gap-4 animate-card-in">
      <div className="w-8 h-8 rounded-full bg-accent-success text-white flex items-center justify-center text-[16px] font-semibold shrink-0">
        ✓
      </div>
      <div>
        <div className="text-[14px] font-semibold text-text-dark">Booked · Group notified</div>
        <div className="text-[12px] text-text-mid mt-0.5">{court} · {date} · Email out, payment link live</div>
      </div>
    </div>
  )
}
