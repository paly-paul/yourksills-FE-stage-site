interface GreetingBannerProps {
  skillMatch?: number;
  behavioralMatch?: number;
  learningMatch?: number;
  isLoading?: boolean;
}

export default function GreetingBanner({
  skillMatch = 82,
  behavioralMatch = 68,
  learningMatch = 72,
  isLoading = false,
}: GreetingBannerProps) {
  if (isLoading) {
    return (
      <div
        className='rounded-card px-8 py-7 text-white mb-6 flex items-center justify-between gap-5 relative overflow-hidden animate-[fadeUp_0.5s_ease_both] sm:flex-row flex-col sm:items-center items-start'
        style={{ background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)" }}>
        <div className='h-20 bg-white/10 rounded-lg flex-1 animate-pulse' />
      </div>
    );
  }

  return (
    <div
      className='rounded-card px-8 py-7 text-white mb-6 flex items-center justify-between gap-5 relative overflow-hidden animate-[fadeUp_0.5s_ease_both] sm:flex-row flex-col sm:items-center items-start'
      style={{ background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)" }}>
      <div className='absolute -top-[60px] -right-[60px] w-[260px] h-[260px] rounded-full bg-white/[.06] pointer-events-none' />
      <div className='absolute -bottom-[80px] left-[30%] w-[200px] h-[200px] rounded-full bg-white/[.04] pointer-events-none' />

      <div className='relative z-10'>
        <h1 className='text-xl font-semibold leading-snug'>
          Hey there, <span className='opacity-85 font-normal'>here&apos;s your</span>
          <br />
          Skill Snapshot! 🎯
        </h1>
        <p className='text-xs opacity-75 mt-1'>
          Here&apos;s what SkillSnap uncovered about you.
        </p>
      </div>

      <div className='relative z-10 flex items-center gap-4 flex-shrink-0 sm:w-auto w-full'>
        <div className='text-center' title='Overall Skill Match %'>
          <div className='text-2xl font-semibold leading-none'>{skillMatch}%</div>
          <div className='text-xs opacity-70 mt-1'>Skill</div>
        </div>
        <div className='w-px h-10 bg-white/20' />
        <div className='text-center' title='Overall Behavioral Match %'>
          <div className='text-2xl font-semibold leading-none'>{behavioralMatch}%</div>
          <div className='text-xs opacity-70 mt-1'>Behavioral</div>
        </div>
        <div className='w-px h-10 bg-white/20' />
        <div className='text-center' title='Overall Learning Match %'>
          <div className='text-2xl font-semibold leading-none'>{learningMatch}%</div>
          <div className='text-xs opacity-70 mt-1'>Learning</div>
        </div>
      </div>
    </div>
  );
}
