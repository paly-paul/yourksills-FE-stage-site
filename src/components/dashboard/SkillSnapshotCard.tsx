import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

interface SkillBar {
  abbr: string;
  name: string;
  score: number;
  iconBg: string;
  iconColor: string;
  barGradient: string;
}

interface Props {
  insightsData?: SnapShotData;
  isLoading?: boolean;
}

const SKILLS: SkillBar[] = [
  { abbr: "Py", name: "Python", score: 90, iconBg: "#eef1ff", iconColor: "#3b5bdb", barGradient: "linear-gradient(90deg,#3b5bdb,#4c6ef5)" },
  { abbr: "SQ", name: "SQL", score: 82, iconBg: "#e3f9fc", iconColor: "#22b8cf", barGradient: "linear-gradient(90deg,#22b8cf,#3b5bdb)" },
  { abbr: "DV", name: "Data Visualization", score: 76, iconBg: "#f5f3ff", iconColor: "#7950f2", barGradient: "linear-gradient(90deg,#7950f2,#a78bfa)" },
  { abbr: "ML", name: "Machine Learning", score: 64, iconBg: "#e6f9ed", iconColor: "#40c057", barGradient: "linear-gradient(90deg,#40c057,#22b8cf)" },
  { abbr: "St", name: "Statistics", score: 71, iconBg: "#fff9e6", iconColor: "#fab005", barGradient: "linear-gradient(90deg,#fab005,#fd7e14)" },
];

const TOP_PILLS = [
  { label: "Python", highlight: true },
  { label: "SQL", highlight: true },
  { label: "Data Visualization", highlight: true },
  { label: "Machine Learning", highlight: false },
  { label: "Statistics", highlight: false },
  { label: "Jira", highlight: false },
  { label: "System Design", highlight: false },
  { label: "Stakeholder Mgmt", highlight: false },
];

/**
 * Extract skills from insights data
 */
function getSkillsFromInsights(insightsData?: SnapShotData): SkillBar[] {
  if (!insightsData?.results?.Technical_and_Career?.["Skills Analysis"]) {
    return SKILLS;
  }

  const skillsAnalysis = insightsData.results.Technical_and_Career["Skills Analysis"];
  const hotSkills = skillsAnalysis["Hot Skills"];

  // Ensure hotSkills is an array
  if (!Array.isArray(hotSkills) || hotSkills.length === 0) {
    return SKILLS;
  }

  const colors = [
    {
      iconBg: "#eef1ff",
      iconColor: "#3b5bdb",
      barGradient: "linear-gradient(90deg,#3b5bdb,#4c6ef5)",
    },
    {
      iconBg: "#e3f9fc",
      iconColor: "#22b8cf",
      barGradient: "linear-gradient(90deg,#22b8cf,#3b5bdb)",
    },
    {
      iconBg: "#f5f3ff",
      iconColor: "#7950f2",
      barGradient: "linear-gradient(90deg,#7950f2,#a78bfa)",
    },
    {
      iconBg: "#e6f9ed",
      iconColor: "#40c057",
      barGradient: "linear-gradient(90deg,#40c057,#22b8cf)",
    },
    {
      iconBg: "#fff9e6",
      iconColor: "#fab005",
      barGradient: "linear-gradient(90deg,#fab005,#fd7e14)",
    },
  ];

  return hotSkills.slice(0, 5).map((skill: { Skill?: string; "Importance (%)"?: number }, index: number) => {
    const color = colors[index] || colors[0];
    const importance = skill["Importance (%)"];
    
    return {
      abbr: (skill.Skill || "").substring(0, 2).toUpperCase(),
      name: skill.Skill || "Unknown",
      score: Math.min(100, typeof importance === "number" ? importance : 0) as number,
      iconBg: color.iconBg,
      iconColor: color.iconColor,
      barGradient: color.barGradient,
    };
  });
}

/**
 * Extract top pills from insights data
 */
function getTopPillsFromInsights(
  insightsData?: SnapShotData
): Array<{ label: string; highlight: boolean }> {
  if (!insightsData?.results?.Technical_and_Career?.["Skills Analysis"]) {
    return TOP_PILLS;
  }

  const skills = insightsData.results.Technical_and_Career["Skills Analysis"];
  const hotSkills = skills["Hot Skills"];
  const warmSkills = skills["Warm Skills"];

  // Ensure both are arrays
  if ((!Array.isArray(hotSkills) || hotSkills.length === 0) && 
      (!Array.isArray(warmSkills) || warmSkills.length === 0)) {
    return TOP_PILLS;
  }

  const pills = [
    ...(Array.isArray(hotSkills) ? hotSkills : []).slice(0, 3).map((skill: { Skill?: string }) => ({
      label: skill.Skill || "Unknown",
      highlight: true,
    })),
    ...(Array.isArray(warmSkills) ? warmSkills : []).slice(0, 5).map((skill: { Skill?: string }) => ({
      label: skill.Skill || "Unknown",
      highlight: false,
    })),
  ];

  // Deduplicate pills by label
  const uniquePills = Array.from(
    new Map(pills.map(p => [p.label, p])).values()
  );

  return uniquePills.slice(0, 8);
}

export default function SkillSnapshotCard({
  insightsData,
  isLoading,
}: Props) {
  const skills = getSkillsFromInsights(insightsData);
  const topPills = getTopPillsFromInsights(insightsData);
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.15s_both]'>
      <div className='p-[22px]'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-muted uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
            </svg>
            Skill Snapshot
          </div>
          <button className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#f5f3ff] border-[1.5px] border-[#c4b5fd] text-brand-violet hover:bg-[#ede9fe] transition-colors'>
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
              <circle cx='12' cy='12' r='3' />
            </svg>
            View full report
          </button>
        </div>

        {isLoading ? (
          <div className='text-center py-8'>
            <p className='text-sm text-brand-muted'>Loading skills...</p>
          </div>
        ) : (
          <>
            <div
              className='rounded-xl p-4 mb-4'
              style={{
                background: "linear-gradient(125deg,#eef2ff 0%,#f5f3ff 50%,#fdf4ff 100%)",
                border: "1.5px solid #ddd6fe",
              }}>
              <div className='inline-flex items-center gap-1.5 text-xs font-semibold text-brand-violet bg-[#ede9fe] px-2.5 py-[3px] rounded-full mb-2.5'>
                <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                </svg>
                Top Skills
              </div>
              <div className='flex flex-wrap gap-1.5'>
                {topPills.map(({ label, highlight }) => (
                  <span
                    key={label}
                    className={`text-xs font-medium px-3 py-[5px] rounded-full border-[1.5px] ${
                      highlight
                        ? "border-[#c4b5fd] text-brand-violet font-semibold"
                        : "border-[#ddd6fe] text-brand-text bg-white"
                    }`}
                    style={highlight ? { background: "linear-gradient(90deg,#eef1ff,#f5f3ff)" } : {}}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className='text-xs font-semibold text-brand-muted uppercase tracking-[.06em] mb-2'>
              Skills analysis · Importance (%)
            </div>
            <div className='flex flex-col gap-3'>
              {skills.map(({ abbr, name, score, iconBg, iconColor, barGradient }) => (
                <div key={name} className='flex items-center gap-2.5'>
                  <div
                    className='w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold flex-shrink-0'
                    style={{ background: iconBg, color: iconColor }}>
                    {abbr}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='text-xs font-semibold mb-[5px]'>{name}</div>
                    <div className='h-[5px] bg-[#eef1ff] rounded-full overflow-hidden'>
                      <div className='h-full rounded-full' style={{ width: `${score}%`, background: barGradient }} />
                    </div>
                  </div>
                  <div className='text-xs font-semibold min-w-[32px] text-right' style={{ color: iconColor }}>
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
