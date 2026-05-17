interface MatchMetric {
  value: string;
  label: string;
  color: string;
}

interface ImpactMetric {
  value: string;
  label: string;
  color: string;
}

interface ProfileCardProps {
  name?: string;
  role?: string;
  careerStage?: string;
  profileCompletion?: number;
  description?: string;
  matchMetrics?: MatchMetric[];
  impactMetrics?: ImpactMetric[];
  isLoading?: boolean;
}

export default function ProfileCard({
  name = "User",
  role = "Professional",
  careerStage = "Mid-Career",
  profileCompletion = 78,
  description = "Dedicated professional bringing expertise and commitment to every project.",
  matchMetrics = [
    { value: "82%", label: "CV Match", color: "#3b5bdb" },
    { value: "68%", label: "Job Match", color: "#40c057" },
    { value: "72%", label: "Anchor Match", color: "#7950f2" },
  ],
  impactMetrics = [
    { value: "+25%", label: "Sprint Throughput", color: "#40c057" },
    { value: "−30%", label: "Team Blockers", color: "#fa5252" },
    { value: "+40%", label: "Team Retention", color: "#3b5bdb" },
  ],
  isLoading = false,
}: ProfileCardProps) {
  // Extract initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (isLoading) {
    return (
      <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.05s_both]'>
        <div className='h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse' />
      </div>
    );
  }

  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.05s_both]'>
      <div
        className='px-[22px] pt-6 pb-5 relative overflow-hidden'
        style={{ background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)" }}>
        <div className='absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full bg-white/[.07] pointer-events-none' />

        <div className='relative inline-block'>
          <div className='w-[70px] h-[70px] rounded-full border-[3px] border-white/50 flex items-center justify-center text-[26px] font-bold text-brand-blue overflow-hidden bg-gradient-to-br from-[#c0cbf7] to-[#e0d6ff]'>
            {initials}
          </div>
          <span className='absolute bottom-[3px] right-[3px] w-[13px] h-[13px] rounded-full bg-brand-green border-[2.5px] border-white' />
        </div>

        <div className='text-[18px] font-bold text-white mt-3'>{name}</div>
        <div className='text-[13px] text-white/75 mt-0.5'>{role} · {careerStage}</div>

        <div className='flex gap-1.5 mt-2.5 flex-wrap'>
          <span className='inline-flex items-center gap-1 text-[11px] font-semibold px-[9px] py-[3px] rounded-full bg-white/20 text-white border border-white/30'>
            <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polyline points='20 6 9 17 4 12' />
            </svg>
            {careerStage}
          </span>
          <span
            className='inline-flex items-center gap-1 text-[11px] font-semibold px-[9px] py-[3px] rounded-full border'
            style={{ background: "rgba(64,192,87,.2)", color: "#6eed8f", borderColor: "rgba(64,192,87,.3)" }}>
            <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
            </svg>
            Professional
          </span>
        </div>
      </div>

      <div className='px-[22px] py-[18px]'>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='text-[12px] font-semibold text-brand-muted'>Profile Completion</span>
          <span className='text-[12px] font-bold text-brand-blue'>{profileCompletion}%</span>
        </div>
        <div className='h-1.5 bg-[#eef1ff] rounded-full overflow-hidden'>
          <div
            className='h-full rounded-full'
            style={{ width: `${profileCompletion}%`, background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)" }}
          />
        </div>

        <div className='h-3.5' />

        <div className='grid grid-cols-3 gap-2.5 mb-4'>
          {matchMetrics.map(({ value, label, color }) => (
            <div key={label} className='text-center py-2.5 px-1.5 bg-brand-bg rounded-[10px] border border-brand-border'>
              <div className='text-[17px] font-bold' style={{ color }}>
                {value}
              </div>
              <div className='text-[10px] text-brand-muted mt-0.5 font-medium'>{label}</div>
            </div>
          ))}
        </div>

        <div className='text-[11px] font-bold text-brand-muted uppercase tracking-[.07em] mb-2.5'>
          ⊕ Why {initials}
        </div>
        <div className='grid grid-cols-3 gap-2.5 mb-3'>
          {impactMetrics.map(({ value, label, color }) => (
            <div key={label} className='text-center py-3 px-2 bg-brand-bg rounded-[10px] border border-brand-border'>
              <div className='text-[20px] font-bold' style={{ color }}>
                {value}
              </div>
              <div className='text-[10px] text-brand-muted mt-0.5 leading-snug'>{label}</div>
            </div>
          ))}
        </div>

        <div className='text-[12px] text-brand-muted leading-relaxed mt-3 px-3 py-2.5 bg-brand-bg rounded-[9px] border-l-[3px] border-brand-violet'>
          {description}
        </div>
      </div>
    </div>
  );
}
