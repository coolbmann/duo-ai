interface Booking {
  court: string
  location: string
  date: string
  duration: string
  cost: string
  party: string[]
  refCode: string
}

interface BoardingPassProps {
  booking: Booking
  draft: string
  onApprove: () => void
  onCancel: () => void
  onEditDraft: () => void
  locked: boolean
}

export function BoardingPass({ booking, draft, onApprove, onCancel, onEditDraft, locked }: BoardingPassProps) {
  const ref = `PB-${booking.refCode}`

  return (
    <div className="bg-bg-card border border-accent-amber rounded-xl overflow-hidden relative animate-card-in">
      {/* Notch circles */}
      <div className="absolute" style={{ right: 0, top: 0, bottom: 0 }}>
        <span className="absolute bg-bg-app border border-accent-amber rounded-full" style={{ width: 18, height: 18, right: -10, top: 60, zIndex: 2 }} />
        <span className="absolute bg-bg-app border border-accent-amber rounded-full" style={{ width: 18, height: 18, right: -10, bottom: 88, zIndex: 2 }} />
      </div>
      <span className="absolute bg-bg-app border border-accent-amber rounded-full" style={{ width: 18, height: 18, left: -10, top: 60, zIndex: 2 }} />
      <span className="absolute bg-bg-app border border-accent-amber rounded-full" style={{ width: 18, height: 18, left: -10, bottom: 88, zIndex: 2 }} />

      {/* Header */}
      <div
        className="flex justify-between items-center"
        style={{ padding: '18px 24px', background: 'linear-gradient(180deg, rgba(245,166,35,0.06), transparent)' }}
      >
        <div className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#8A5A0E' }}>
          <span style={{ fontSize: 14 }}>⏸</span>
          READY TO SEND
        </div>
        <div className="text-text-light tracking-[0.06em]" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>
          REF · {ref}
        </div>
      </div>

      {/* Dashed divider */}
      <div className="mx-3" style={{ height: 1, backgroundImage: 'linear-gradient(to right, #D6D6D2 50%, transparent 50%)', backgroundSize: '8px 1px', backgroundRepeat: 'repeat-x' }} />

      {/* Fields */}
      <div className="grid gap-4 px-6 py-[18px]" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-light mb-1">COURT</div>
          <div className="text-[18px] font-semibold tracking-tight text-text-dark leading-snug">{booking.court}</div>
          <div className="text-[12px] text-text-mid mt-1">{booking.location}</div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-light mb-1">DATE / TIME</div>
          <div className="text-[18px] font-semibold tracking-tight text-text-dark">{booking.date}</div>
          <div className="text-[12px] text-text-mid mt-1">{booking.duration} · {booking.cost}</div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-light mb-1">PARTY</div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {booking.party.map((p) => (
              <span key={p} className="text-[11px] text-text-dark bg-bg-app border border-border-light rounded-full" style={{ padding: '3px 9px' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-light mb-1">PAYMENT LINK</div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 mt-1.5 bg-bg-hover border border-dashed border-border-mid rounded-md px-3 py-1.5 text-[12px] text-text-dark"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>Pay your share</span>
            <span className="text-brand">→</span>
          </a>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="mx-3" style={{ height: 1, backgroundImage: 'linear-gradient(to right, #D6D6D2 50%, transparent 50%)', backgroundSize: '8px 1px', backgroundRepeat: 'repeat-x' }} />

      {/* Email draft */}
      <div className="px-6 py-[18px]">
        <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-light mb-2">EMAIL DRAFT</div>
        <div className="bg-bg-app border border-border-light rounded-lg px-4 py-3.5 text-[13px] text-text-mid leading-relaxed mt-2">
          <div className="text-[11px] text-text-light font-medium mb-2 flex gap-2">
            <span className="min-w-[20px]">To:</span>
            <span className="text-text-dark font-medium">{booking.party.join(', ')}</span>
          </div>
          <div className="text-text-dark">
            <q>{draft}</q>
          </div>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onEditDraft() }}
            className="inline-block mt-2.5 text-[11px] text-brand underline underline-offset-[3px]"
          >
            [Edit draft]
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-6 pb-[22px]">
        <button
          onClick={onApprove}
          disabled={locked}
          className="flex-1 bg-brand text-white text-[13px] font-medium rounded-lg py-3 px-6 inline-flex items-center justify-center gap-2 transition-colors hover:bg-brand-hover disabled:bg-bg-hover disabled:text-text-light"
        >
          {locked ? 'Sent ✓' : 'Approve & Send'}
        </button>
        <button
          onClick={onCancel}
          disabled={locked}
          className="bg-bg-hover text-text-mid text-[13px] font-medium rounded-lg py-3 px-5 transition-colors hover:text-text-dark hover:bg-[#EAEAE6] disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      {/* Dashed divider */}
      <div className="mx-3" style={{ height: 1, backgroundImage: 'linear-gradient(to right, #D6D6D2 50%, transparent 50%)', backgroundSize: '8px 1px', backgroundRepeat: 'repeat-x' }} />

      {/* Stub */}
      <div
        className="flex justify-between items-center bg-bg-app text-text-light tracking-[0.04em]"
        style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: 11 }}
      >
        <span>STUB · {ref}</span>
        <div className="flex gap-px h-[22px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <i
              key={i}
              className="block bg-text-mid"
              style={{ width: (i % 3 === 0 ? 3 : i % 4 === 0 ? 1 : 2) + 'px', opacity: i % 5 === 0 ? 0.4 : 1 }}
            />
          ))}
        </div>
        <span>{booking.date.split(',')[0].toUpperCase()}</span>
      </div>
    </div>
  )
}
