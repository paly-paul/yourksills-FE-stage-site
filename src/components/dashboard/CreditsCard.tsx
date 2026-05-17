export default function CreditsCard() {
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.2s_both]'>
      <div className='p-[22px]'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1.5 text-[13px] font-bold text-brand-muted uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
            Credits Balance
          </div>
          <button className='px-3 py-1.5 text-[12px] font-semibold rounded-lg bg-brand-bg border border-brand-border text-brand-text hover:bg-[#eef1ff] hover:border-brand-indigo hover:text-brand-blue transition-colors'>
            History
          </button>
        </div>

        <div
          className='rounded-xl p-5 mb-4 relative overflow-hidden'
          style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)" }}>
          <div
            className='absolute -top-5 -right-5 w-24 h-24 rounded-full pointer-events-none'
            style={{ background: "rgba(121,80,242,.25)" }}
          />
          <div className='text-[42px] font-extrabold text-white leading-none relative z-10'>5</div>
          <div className='text-[12px] text-white/50 mt-1 font-medium relative z-10'>Credits Remaining</div>
          <div className='mt-3.5 relative z-10'>
            <div className='flex justify-between text-[11px] text-white/50 mb-1.5'>
              <span>0</span>
              <span>50 total</span>
            </div>
            <div className='h-1.5 bg-white/10 rounded-full overflow-hidden'>
              <div
                className='h-full rounded-full'
                style={{ width: "10%", background: "linear-gradient(90deg,#818cf8,#a78bfa)" }}
              />
            </div>
          </div>
        </div>

        <div className='flex gap-2 mb-4'>
          {[
            { val: "45", lbl: "Used", color: "#3b5bdb" },
            { val: "5", lbl: "Remaining", color: "#40c057" },
            { val: "12", lbl: "Actions", color: "#7950f2" },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className='flex-1 py-2.5 px-2 bg-brand-bg rounded-[10px] border border-brand-border text-center'>
              <div className='text-[15px] font-bold' style={{ color }}>
                {val}
              </div>
              <div className='text-[10px] text-brand-muted mt-0.5'>{lbl}</div>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-2 px-3 py-2.5 bg-[#fff9e6] rounded-[9px] border border-[#fde68a] mb-3'>
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#d97706' strokeWidth='2'>
            <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
            <line x1='12' y1='9' x2='12' y2='13' />
            <line x1='12' y1='17' x2='12.01' y2='17' />
          </svg>
          <span className='text-[12px] font-medium text-[#92400e]'>Low credits — top up to continue</span>
        </div>

        <button
          className='w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-[9px] text-[13px] font-semibold text-white transition-all hover:-translate-y-px'
          style={{
            background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)",
            boxShadow: "0 4px 14px rgba(122,98,253,.3)",
          }}>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          Buy Credits
        </button>
      </div>
    </div>
  );
}
