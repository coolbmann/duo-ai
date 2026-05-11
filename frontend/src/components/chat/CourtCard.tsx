import { cn } from '@/lib/utils'
import { COURTS } from '@/data'

interface CourtCardProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onConfirm: () => void
  locked: boolean
}

export function CourtCard({ selectedId, onSelect, onConfirm, locked }: CourtCardProps) {
  return (
    <div className="bg-bg-card border border-accent-amber rounded-xl p-5 animate-card-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#8A5A0E' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-amber-pulse" />
          SELECT A COURT
        </div>
        <div className="text-[11px] text-text-light uppercase tracking-[0.08em]">Checkpoint 1 of 2 · Human in the loop</div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {COURTS.map((c) => (
          <button
            key={c.id}
            disabled={locked}
            onClick={() => !locked && onSelect(c.id)}
            className={cn(
              'grid items-start gap-3.5 text-left w-full rounded-[10px] border transition-colors',
              'hover:bg-bg-hover hover:border-border-mid',
              selectedId === c.id
                ? 'border-brand border-l-[3px] bg-[rgba(45,111,245,0.04)]'
                : 'border-border-light bg-transparent',
            )}
            style={{ gridTemplateColumns: '16px 1fr auto', padding: '14px 14px 14px 16px' }}
          >
            <span
              className={cn('w-2 h-2 rounded-full mt-1.5', selectedId === c.id ? 'bg-brand' : 'bg-border-mid')}
            />
            <div>
              <div className="text-[14px] font-semibold text-text-dark mb-1">{c.name}</div>
              <div className="text-[12px] text-text-mid flex flex-wrap gap-1.5">
                <span>{c.courts} courts available</span>
                <span className="before:content-['·'] before:mr-1.5 before:text-border-mid">{c.distance} away</span>
                {c.surface && <span className="before:content-['·'] before:mr-1.5 before:text-border-mid">{c.surface}</span>}
              </div>
              {c.preferred && (
                <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded bg-[#EDFBC8] text-[#4A6B11]">
                  ★ Matches your usual preference
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-[13px] font-semibold text-text-dark tabular-nums">{c.time}</div>
              <div className="text-[11px] text-text-light mt-1">{c.price}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={!selectedId || locked}
          className="flex-1 bg-brand text-white text-[13px] font-medium rounded-lg py-3 px-6 inline-flex items-center justify-center gap-2 transition-colors hover:bg-brand-hover disabled:bg-bg-hover disabled:text-text-light"
        >
          {locked ? 'Court confirmed' : <>Confirm this court <span>→</span></>}
        </button>
      </div>
    </div>
  )
}
