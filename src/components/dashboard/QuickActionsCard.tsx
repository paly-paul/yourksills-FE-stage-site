export default function QuickActionsCard() {
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.25s_both]'>
      <div className='p-[22px]'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-muted uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
            </svg>
            Quick Actions
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2.5'>
          <button
            className='col-span-2 flex flex-row items-center gap-3 px-5 py-4 rounded-xl transition-all hover:-translate-y-0.5 text-left'
            style={{
              background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)",
              boxShadow: "0 8px 24px rgba(122,98,253,.35)",
            }}>
            <div className='w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-white/15'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2'>
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='17 8 12 3 7 8' />
                <line x1='12' y1='3' x2='12' y2='15' />
              </svg>
            </div>
            <div>
              <div className='text-xs font-semibold text-white'>Upload CV</div>
              <div className='text-xs text-white/65 mt-0.5'>Refresh your snapshot</div>
            </div>
          </button>

          <button className='flex flex-col items-center justify-center gap-2 py-[18px] px-3 rounded-xl border-[1.5px] border-brand-border bg-brand-surface text-center transition-all hover:border-brand-indigo hover:bg-[#f0f4ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,91,219,.12)]'>
            <div className='w-10 h-10 rounded-[10px] flex items-center justify-center bg-[#f5f3ff]'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#7950f2' strokeWidth='2'>
                <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
              </svg>
            </div>
            <div className='text-xs font-semibold text-brand-violet'>Generate Skill Snapshot</div>
            <div className='text-xs text-brand-muted'>3 credits</div>
          </button>

          <button className='flex flex-col items-center justify-center gap-2 py-[18px] px-3 rounded-xl border-[1.5px] border-brand-border bg-brand-surface text-center transition-all hover:border-brand-indigo hover:bg-[#f0f4ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,91,219,.12)]'>
            <div className='w-10 h-10 rounded-[10px] flex items-center justify-center bg-[#eef1ff]'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='#3b5bdb' strokeWidth='2'>
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
              </svg>
            </div>
            <div className='text-xs font-semibold text-brand-blue'>Job title</div>
            <div className='text-xs text-brand-muted'>2 credits</div>
          </button>
        </div>
      </div>
    </div>
  );
}
