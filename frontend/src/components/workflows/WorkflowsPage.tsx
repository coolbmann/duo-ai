import { useState } from 'react'
import { WORKFLOWS } from '@/data'

const TABS = ['all', 'live', 'paused', 'drafts'] as const

export function WorkflowsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('all')

  const filtered = WORKFLOWS.filter((w) => tab === 'all' || w.status === tab)

  return (
    <div className="h-full overflow-y-auto bg-bg-app">
      <div className="max-w-[1280px] mx-auto" style={{ padding: '36px 44px 80px' }}>
        <div className="mb-7">
          <h1 className="text-[26px] font-semibold tracking-tight text-text-dark m-0 mb-1.5">Workflows</h1>
          <p className="text-[14px] text-text-mid m-0">
            Multi-step automations that chain agents together. Triggered manually, on a schedule, or via webhook.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-[22px]">
          <div className="flex-1 max-w-[360px] flex items-center gap-2 bg-bg-card border border-border-light rounded-lg px-3 py-2.5 text-[13px] text-text-mid transition-colors focus-within:border-border-mid">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className="flex-1 border-none outline-none bg-transparent text-[13px]" placeholder="Search workflows..." />
          </div>
          <button className="bg-text-dark text-white text-[13px] font-medium px-3.5 py-2.5 rounded-lg inline-flex items-center gap-1.5 hover:bg-black transition-colors">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New workflow
          </button>
        </div>

        {/* Tab strip */}
        <div className="flex gap-1 border-b border-border-light mb-[22px]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
                tab === t
                  ? 'text-text-dark border-text-dark'
                  : 'text-text-mid border-transparent hover:text-text-dark'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'live' && (
                <span className="ml-1.5 text-text-light font-normal">4</span>
              )}
            </button>
          ))}
        </div>

        {/* Workflow table */}
        <div className="bg-bg-card border border-border-light rounded-xl overflow-hidden">
          <div
            className="grid gap-3.5 text-[11px] uppercase tracking-[0.08em] text-text-light font-medium bg-bg-hover border-b border-border-light"
            style={{ gridTemplateColumns: '36px 1fr 140px 120px 100px', padding: '12px 18px' }}
          >
            <div />
            <div>Name</div>
            <div>Trigger</div>
            <div>Runs</div>
            <div className="text-right">Status</div>
          </div>

          {filtered.map((wf) => (
            <div
              key={wf.id}
              className="grid items-center gap-3.5 border-b border-border-light last:border-b-0 cursor-pointer transition-colors text-[13px] hover:bg-bg-hover"
              style={{ gridTemplateColumns: '36px 1fr 140px 120px 100px', padding: '14px 18px' }}
            >
              <div className="w-7 h-7 rounded-[7px] bg-[#E9F0FE] text-brand inline-flex items-center justify-center text-[13px]">
                {wf.icon}
              </div>
              <div>
                <div className="font-medium text-text-dark">{wf.name}</div>
                <div className="text-[12px] text-text-light mt-0.5">{wf.desc}</div>
              </div>
              <div className="text-[12px] text-text-mid flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-amber" />
                {wf.trigger}
              </div>
              <div className="text-[12px] text-text-mid tabular-nums">{wf.runs} runs</div>
              <div className="flex justify-end">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] font-medium px-2.5 py-1 rounded-full ${
                    wf.status === 'live'
                      ? 'text-[#146E3D] bg-[#D9F7E5]'
                      : 'text-text-mid bg-bg-hover'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {wf.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
