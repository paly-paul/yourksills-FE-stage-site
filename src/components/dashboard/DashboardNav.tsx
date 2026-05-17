export default function DashboardNav() {
  return (
    <nav className='sticky top-0 z-50 h-16 bg-white/92 backdrop-blur-md border-b border-brand-border flex items-center justify-between px-6'>
      <div className='flex items-center gap-2.5'>
        <div
          className='w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0'
          style={{ background: "linear-gradient(135deg,#3b5bdb,#7950f2)" }}>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2'>
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
          </svg>
        </div>
        <span className='text-base font-bold text-brand-blue'>
          YourSkills<span className='text-brand-muted font-normal'>.ai</span>
        </span>
      </div>

      <div className='hidden sm:flex items-center gap-1.5'>
        <div className='w-2 h-2 rounded-full bg-brand-green' title='Upload CV' />
        <div className='w-6 h-px bg-brand-subtle' />
        <div className='w-2 h-2 rounded-full bg-brand-green' title='Profile' />
        <div className='w-6 h-px bg-brand-subtle' />
        <div
          className='w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_0_3px_rgba(59,91,219,0.2)]'
          title='Skill Snapshot'
        />
        <div className='w-6 h-px bg-brand-subtle' />
        <div className='w-2 h-2 rounded-full bg-brand-subtle' title='Job Match' />
      </div>

      <div className='flex items-center gap-2.5'>
        <button
          className='relative w-9 h-9 rounded-[9px] bg-brand-bg border border-brand-border flex items-center justify-center hover:bg-[#eef1ff] hover:border-brand-indigo transition-colors'
          title='Notifications'>
          <svg width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='#8792b2' strokeWidth='2'>
            <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 0 1-3.46 0' />
          </svg>
          <span className='absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-red border-2 border-white' />
        </button>

        <button
          className='w-9 h-9 rounded-[9px] bg-brand-bg border border-brand-border flex items-center justify-center hover:bg-[#eef1ff] hover:border-brand-indigo transition-colors'
          title='Settings'>
          <svg width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='#8792b2' strokeWidth='2'>
            <circle cx='12' cy='12' r='3' />
            <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
          </svg>
        </button>

        <div
          className='w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white cursor-pointer flex-shrink-0'
          style={{ background: "linear-gradient(135deg,#3b5bdb,#7950f2)" }}>
          AS
        </div>
      </div>
    </nav>
  );
}
