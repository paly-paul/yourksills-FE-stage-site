import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

interface PillarRow {
  pillar: string;
  action: string;
  outcome: string;
  dotColor: string;
  accentBg: string;
  accentColor: string;
}

interface Props {
  insightsData?: SnapShotData;
  isLoading?: boolean;
}

const PILLAR_COLORS = [
  { dotColor: "#7950f2", accentBg: "#f5f3ff", accentColor: "#7950f2" },
  { dotColor: "#3b5bdb", accentBg: "#eef1ff", accentColor: "#3b5bdb" },
  { dotColor: "#0c8599", accentBg: "#e3f9fc", accentColor: "#0c8599" },
  { dotColor: "#2f9e44", accentBg: "#e6f9ed", accentColor: "#2f9e44" },
  { dotColor: "#e67700", accentBg: "#fff9e6", accentColor: "#e67700" },
  { dotColor: "#d9480f", accentBg: "#fff4e6", accentColor: "#d9480f" },
];

const FALLBACK_PILLARS: PillarRow[] = [
  { pillar: "Construction Management", action: "Overseeing core construction", outcome: "On-time project delivery",     ...PILLAR_COLORS[0] },
  { pillar: "Project Execution",        action: "Managing project schedules",  outcome: "Within-budget completion",     ...PILLAR_COLORS[1] },
  { pillar: "Site Supervision",         action: "Leading construction teams",  outcome: "Zero safety incidents",        ...PILLAR_COLORS[2] },
  { pillar: "Budget & Cost Control",    action: "Controlling project budgets", outcome: "Reduced project delays",       ...PILLAR_COLORS[3] },
  { pillar: "QA/QC & HSE",             action: "Ensuring quality and safety", outcome: "Successful project completion", ...PILLAR_COLORS[4] },
  { pillar: "Team Leadership",          action: "Coordinating subcontractors", outcome: "Efficient resource management", ...PILLAR_COLORS[5] },
];

function getPillarsFromInsights(insightsData?: SnapShotData): {
  pillars: PillarRow[];
  takeaway: string;
} {
  const block = insightsData?.results?.Skill_and_Role?.Skill_Pillars;

  if (!block || !Array.isArray(block.Skill_Pillars) || block.Skill_Pillars.length === 0) {
    return { pillars: FALLBACK_PILLARS, takeaway: "" };
  }

  const pillars = block.Skill_Pillars.map((pillar, i) => ({
    pillar,
    action: block.What_you_are_doing[i] ?? "—",
    outcome: block.Outcome[i] ?? "—",
    ...PILLAR_COLORS[i % PILLAR_COLORS.length],
  }));

  return { pillars, takeaway: block.Takeaway ?? "" };
}

export default function SkillSnapshotCard({ insightsData, isLoading }: Props) {
  const { pillars, takeaway } = getPillarsFromInsights(insightsData);

  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.15s_both]'>
      <div className='p-4 sm:p-[22px]'>
        {/* Header */}
        <div className='flex items-center mb-4'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-violet uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <rect x='3' y='3' width='7' height='7' rx='1' />
              <rect x='14' y='3' width='7' height='7' rx='1' />
              <rect x='3' y='14' width='7' height='7' rx='1' />
              <rect x='14' y='14' width='7' height='7' rx='1' />
            </svg>
            Skill Pillars
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-8'>
            <p className='text-sm text-brand-muted'>Loading pillars...</p>
          </div>
        ) : (
          <>
            {/* Column labels — desktop only */}
            <div className='hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-3 px-3.5 mb-1.5'>
              <span className='text-[10px] font-semibold text-brand-muted uppercase tracking-wide'>Pillar</span>
              <span className='text-[10px] font-semibold text-brand-muted uppercase tracking-wide'>What you do</span>
              <span className='text-[10px] font-semibold text-brand-muted uppercase tracking-wide'>Outcome</span>
            </div>

            {/* Rows */}
            <div className='flex flex-col gap-2'>
              {pillars.map(({ pillar, action, outcome, dotColor, accentBg, accentColor }) => (
                <div
                  key={pillar}
                  className='flex items-start justify-between gap-2 sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:items-center sm:gap-3 px-3.5 py-3 rounded-[11px] bg-brand-bg border border-brand-border'>
                  {/* Pillar — on mobile also shows action as subtitle */}
                  <div className='flex items-start gap-2 min-w-0'>
                    <div className='w-2 h-2 rounded-full flex-shrink-0 mt-1' style={{ background: dotColor }} />
                    <div className='min-w-0'>
                      <span className='text-xs font-semibold leading-snug block'>{pillar}</span>
                      <span className='sm:hidden text-xs text-brand-muted leading-snug mt-0.5 block'>{action}</span>
                    </div>
                  </div>

                  {/* Action — desktop only */}
                  <span className='hidden sm:block text-xs text-brand-muted leading-snug'>{action}</span>

                  {/* Outcome */}
                  <span
                    className='text-xs font-medium px-2 py-0.5 rounded-full text-center leading-snug flex-shrink-0 self-start sm:self-auto'
                    style={{ background: accentBg, color: accentColor }}>
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Takeaway */}
            {takeaway && (
              <p className='mt-3 text-xs text-brand-muted leading-relaxed border-t border-brand-border pt-3'>
                {takeaway}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
