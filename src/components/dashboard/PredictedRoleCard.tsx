import type { PredictModelOneResult } from "@/services/jobPrediction/getPredictModelOneResultService";
import ConfidenceRing from "./ConfidenceRing";

interface Props {
  predictionData?: PredictModelOneResult;
  isLoading?: boolean;
}

const DEFAULT_ROLE_TAGS = ["Analytics", "Data & BI", "Mid-Senior", "Remote-friendly"];

/**
 * Extract role tags from prediction data with deduplication
 */
function getRoleTagsFromPrediction(predictionData?: PredictModelOneResult): string[] {
  if (!predictionData?.best_fit) {
    return DEFAULT_ROLE_TAGS;
  }

  const bestFit = predictionData.best_fit;
  const tags = [];

  // Add job family
  if (bestFit.job_family) {
    tags.push(bestFit.job_family);
  }

  // Add sector (avoid duplicates)
  if (bestFit.sector && bestFit.sector !== bestFit.job_family) {
    tags.push(bestFit.sector);
  }

  // Add managerial level
  if (bestFit.managerial_level) {
    tags.push(bestFit.managerial_level);
  }

  // Add sub_sector (avoid duplicates)
  if (bestFit.sub_sector && bestFit.sub_sector !== bestFit.job_family && bestFit.sub_sector !== bestFit.sector) {
    tags.push(bestFit.sub_sector);
  }

  // Return unique tags, fall back to defaults if empty
  const uniqueTags = [...new Set(tags)];
  return uniqueTags.length > 0 ? uniqueTags : DEFAULT_ROLE_TAGS;
}

/**
 * Extract match percentage as number
 */
function getMatchPercentage(percentage?: string): number {
  if (!percentage) return 0;
  const num = parseInt(percentage.replace("%", ""), 10);
  return isNaN(num) ? 0 : Math.min(100, num);
}

export default function PredictedRoleCard({ predictionData, isLoading }: Props) {
  const bestFit = predictionData?.best_fit;
  const jobRole = bestFit?.job_role || "Data Analyst";
  const matchPercentage = getMatchPercentage(bestFit?.overall_match_pct);
  const roleTags = getRoleTagsFromPrediction(predictionData);

  return (
    <div
      className='rounded-card p-6 text-white relative overflow-hidden border-0 animate-[fadeUp_0.5s_ease_0.1s_both]'
      style={{
        background: "linear-gradient(94.61deg,#8052fe -25.15%,#7a62fd 24.09%,#4dd4f8 213.62%)",
        boxShadow: "0 8px 32px rgba(122,98,253,.28)",
      }}>
      <div className='absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[.05] pointer-events-none' />
      <div className='absolute -bottom-12 left-2.5 w-36 h-36 rounded-full bg-white/[.04] pointer-events-none' />

      <div className='relative z-10 flex items-start justify-between mb-5'>
        <div>
          <div className='text-xs font-semibold opacity-65 uppercase tracking-[.08em]'>
            Role focus
          </div>
          {isLoading ? (
            <div className='text-xl font-semibold mt-1.5 leading-tight opacity-60'>Loading...</div>
          ) : (
            <>
              <div className='text-xl font-semibold mt-1.5 leading-tight'>{jobRole}</div>
              <div className='text-xs opacity-55 mt-1.5'>Last updated · Just now</div>
            </>
          )}
        </div>

        <ConfidenceRing percentage={isLoading ? 0 : matchPercentage} />
      </div>

      {!isLoading && (
        <div className='relative z-10 flex flex-wrap gap-1.5 mb-4'>
          {roleTags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className='text-xs font-medium px-2.5 py-[3px] rounded-full border text-white/85'
              style={{ background: "rgba(255,255,255,.12)", borderColor: "rgba(255,255,255,.15)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
