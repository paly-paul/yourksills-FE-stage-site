import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";
import type { PredictModelOneResult } from "@/services/jobPrediction/getPredictModelOneResultService";

interface ActivityItem {
  dotColor: string;
  title: string;
  meta: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
}

interface Props {
  insightsData?: SnapShotData;
  predictionData?: PredictModelOneResult;
  isLoading?: boolean;
}

const ACTIVITIES: ActivityItem[] = [
  {
    dotColor: "#7950f2",
    title: "Snapshot Generated",
    meta: "3 credits used · v2.4.1",
    badge: "Today",
    badgeBg: "#f5f3ff",
    badgeColor: "#7950f2",
  },
  {
    dotColor: "#3b5bdb",
    title: "Job title updated",
    meta: "Data Analyst · 82% skill match",
    badge: "2d ago",
    badgeBg: "#eef1ff",
    badgeColor: "#3b5bdb",
  },
  {
    dotColor: "#40c057",
    title: "CV Uploaded",
    meta: "Anita_Shen_CV_2026.pdf",
    badge: "1w ago",
    badgeBg: "#e6f9ed",
    badgeColor: "#40c057",
  },
  {
    dotColor: "#fab005",
    title: "Credits Purchased",
    meta: "Standard · 150 credits",
    badge: "2w ago",
    badgeBg: "#fff9e6",
    badgeColor: "#fab005",
  },
  {
    dotColor: "#8792b2",
    title: "Profile Created",
    meta: "Welcome to YourSkills.ai!",
    badge: "1mo",
    badgeBg: "#f2f4fb",
    badgeColor: "#8792b2",
  },
];

function getSnapshotItems(
  insightsData?: SnapShotData,
  predictionData?: PredictModelOneResult
): ActivityItem[] {
  const bf = predictionData?.best_fit;
  if (!bf) return ACTIVITIES;

  const careerStage =
    insightsData?.results?.Growth_and_Market?.Pitches?.["Career Stage"] ?? "—";

  return [
    {
      dotColor: "#7950f2",
      title: "Role Identified",
      meta: `${bf.job_role} · ${bf.managerial_level}`,
      badge: "Best Fit",
      badgeBg: "#f5f3ff",
      badgeColor: "#7950f2",
    },
    {
      dotColor: "#3b5bdb",
      title: "Overall Match",
      meta: `${bf.overall_match_pct} overall · ${bf.talent_match_pct} talent`,
      badge: "Score",
      badgeBg: "#eef1ff",
      badgeColor: "#3b5bdb",
    },
    {
      dotColor: "#40c057",
      title: "Career Stage",
      meta: `${careerStage} · ${bf.job_family}`,
      badge: "Stage",
      badgeBg: "#e6f9ed",
      badgeColor: "#40c057",
    },
    {
      dotColor: "#fab005",
      title: "Skills Aligned",
      meta: `${bf.matched_skills.length} matched · ${bf.missing_skills.length} to develop`,
      badge: "Skills",
      badgeBg: "#fff9e6",
      badgeColor: "#fab005",
    },
    {
      dotColor: "#8792b2",
      title: "Sector Focus",
      meta: `${bf.sector} · ${bf.industry}`,
      badge: "Industry",
      badgeBg: "#f2f4fb",
      badgeColor: "#8792b2",
    },
  ];
}

export default function ActivityCard({ insightsData, predictionData, isLoading }: Props) {
  const activities = getSnapshotItems(insightsData, predictionData);
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.25s_both]'>
      <div className='p-4 sm:p-[22px]'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-foreground uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <circle cx='12' cy='12' r='10' />
              <polyline points='12 6 12 12 16 14' />
            </svg>
            Role Snapshot
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-8'>
            <p className='text-sm text-brand-muted'>Loading snapshot...</p>
          </div>
        ) : (
          <div className='flex flex-col'>
            {activities.map((item, i) => {
              const isLast = i === activities.length - 1;
              return (
                <div key={item.title} className={`flex items-start gap-3 py-[13px] ${!isLast ? "border-b border-brand-border" : ""}`}>
                  <div className='flex flex-col items-center gap-0 flex-shrink-0'>
                    <div className='w-2.5 h-2.5 rounded-full mt-[3px]' style={{ background: item.dotColor }} />
                    {!isLast && <div className='w-px flex-1 bg-brand-border min-h-[20px] my-1' />}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='text-xs font-semibold'>{item.title}</div>
                    <div className='text-xs text-brand-muted mt-0.5'>{item.meta}</div>
                  </div>

                  <span
                    className='text-xs font-semibold px-[7px] py-[2px] rounded-full whitespace-nowrap flex-shrink-0 self-start mt-0.5'
                    style={{ background: item.badgeBg, color: item.badgeColor }}>
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
