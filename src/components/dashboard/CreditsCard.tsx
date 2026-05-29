export default function CreditsCard() {
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.2s_both]'>
      <div className='p-4 sm:p-[22px]'>
        {/* Header */}
        <div className='flex items-center gap-1.5 text-[13px] font-bold text-brand-foreground uppercase tracking-[.06em] mb-4'>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='12' cy='12' r='10' />
            <path d='M12 6v6l4 2' />
          </svg>
          Credits Balance
        </div>

        {/* Coming Soon hero panel */}
        <div
          className='rounded-xl px-5 py-7 relative overflow-hidden'
          style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)" }}
        >
          {/* Ambient blobs */}
          <div
            className='absolute -top-7 -right-7 w-32 h-32 rounded-full pointer-events-none'
            style={{ background: "rgba(128,82,254,.22)" }}
          />
          <div
            className='absolute -bottom-5 -left-5 w-24 h-24 rounded-full pointer-events-none'
            style={{ background: "rgba(77,212,248,.11)" }}
          />

          <div className='relative z-10 flex flex-col items-center text-center gap-3'>
            {/* Sparkle icon in a glowing ring */}
            <div
              className='w-14 h-14 rounded-full flex items-center justify-center mb-0.5'
              style={{
                background: "rgba(128,82,254,.18)",
                border: "1px solid rgba(128,82,254,.45)",
                boxShadow: "0 0 20px rgba(128,82,254,.35)",
              }}
            >
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l5.91-1.01z'
                  fill='#c4b5fd'
                  opacity='.95'
                />
              </svg>
            </div>

            {/* Gradient headline */}
            <span
              className='text-[30px] font-extrabold leading-none tracking-tight'
              style={{
                background: "linear-gradient(94.61deg,#8052fe 0%,#a78bfa 50%,#4dd4f8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Coming Soon
            </span>

            <p className='text-[13px] text-white/75 leading-relaxed max-w-[200px]'>
              Credits &amp; billing are being crafted with care. You&apos;ll be the first to know when it goes live.
            </p>
          </div>
        </div>

        {/* Notification strip */}
        <div
          className='mt-3 flex items-center justify-center gap-2 py-2.5 rounded-[9px]'
          style={{
            background: "linear-gradient(90deg,rgba(128,82,254,.07),rgba(77,212,248,.07))",
            border: "1px solid rgba(128,82,254,.18)",
          }}
        >
          <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='#a78bfa' strokeWidth='2'>
            <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 0 1-3.46 0' />
          </svg>
          <span className='text-[13px] font-medium' style={{ color: "#c4b5fd" }}>
            We&apos;ll let you know when it&apos;s ready
          </span>
        </div>
      </div>
    </div>
  );
}
