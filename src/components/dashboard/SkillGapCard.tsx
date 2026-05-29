"use client";

import { useState } from "react";
import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

type GapLevel = "High" | "Mid" | "Low";

interface GapItem {
  emoji: string;
  name: string;
  level: GapLevel;
  iconBg: string;
}

interface Props {
  insightsData?: SnapShotData;
  isLoading?: boolean;
}

const GAPS: GapItem[] = [
  { emoji: "📊", name: "Advanced SQL", level: "High", iconBg: "#fff0f0" },
  { emoji: "📈", name: "Power BI", level: "Mid", iconBg: "#fff9e6" },
  { emoji: "🗄️", name: "Data Warehousing", level: "Low", iconBg: "#f0fdf4" },
  { emoji: "☁️", name: "Cloud Platforms", level: "High", iconBg: "#fff0f0" },
];

const levelStyles: Record<GapLevel, string> = {
  High: "bg-[#fff0f0] text-brand-red",
  Mid: "bg-[#fff9e6] text-brand-yellow",
  Low: "bg-[#f0fdf4] text-brand-green",
};

/**
 * Extract "Getting There" skills from insights
 */
function getGapSkillsFromInsights(insightsData?: SnapShotData): GapItem[] {
  if (!insightsData?.results?.Technical_and_Career?.["Skills Analysis"]) {
    return GAPS;
  }

  const skillsAnalysis = insightsData.results.Technical_and_Career["Skills Analysis"];
  const gettingThereSkills = skillsAnalysis["Getting There Skills"];

  // Ensure gettingThereSkills is an array
  if (!Array.isArray(gettingThereSkills) || gettingThereSkills.length === 0) {
    return GAPS;
  }

  const emojis = ["📊", "📈", "🗄️", "☁️"];

  return gettingThereSkills.slice(0, 4).map((skill: { "Importance (%)"?: number; Skill?: string }, index: number) => {
    const importance = skill["Importance (%)"];
    
    // Determine level based on importance
    let level: GapLevel = "Low";
    if (typeof importance === "number") {
      if (importance >= 70) level = "High";
      else if (importance >= 55) level = "Mid";
      else level = "Low";
    }

    const iconBg = level === "High" ? "#fff0f0" : level === "Mid" ? "#fff9e6" : "#f0fdf4";

    return {
      emoji: emojis[index] || "📚",
      name: skill.Skill || "Unknown Skill",
      level,
      iconBg,
    };
  });
}

export default function SkillGapCard({ insightsData, isLoading }: Props) {
  const gaps = getGapSkillsFromInsights(insightsData);
  const learnItems: string[] =
    insightsData?.results?.Growth_and_Market?.["What to do next"]?.Learn ?? [];
  const [showLearn, setShowLearn] = useState(false);
  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.2s_both]'>
      <div className='p-4 sm:p-[22px]'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-red uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
              <line x1='12' y1='9' x2='12' y2='13' />
              <line x1='12' y1='17' x2='12.01' y2='17' />
            </svg>
            Getting There Skills
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-8'>
            <p className='text-sm text-brand-muted'>Loading skills...</p>
          </div>
        ) : (
          <>
            <div className='flex flex-col gap-2.5'>
              {gaps.map(({ emoji, name, level, iconBg }) => (
                <div
                  key={name}
                  className='flex items-center gap-3 px-3.5 py-3 bg-brand-bg rounded-[11px] border border-brand-border hover:border-brand-indigo hover:bg-[#f0f4ff] transition-colors'>
                  <div
                    className='w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0 text-[14px]'
                    style={{ background: iconBg }}>
                    {emoji}
                  </div>
                  <div className='text-xs font-semibold flex-1'>{name}</div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelStyles[level]}`}>
                    {level}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLearn((v) => !v)}
              className='w-full flex items-center gap-1.5 mt-3.5 px-3.5 py-[11px] rounded-[11px] text-left transition-opacity hover:opacity-80'
              style={{ background: "linear-gradient(90deg,#eef1ff,#f5f3ff)", border: "1px solid #ddd6fe" }}>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#7950f2' strokeWidth='2'>
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1='10' y1='14' x2='21' y2='3' />
              </svg>
              <span className='text-xs font-medium text-brand-violet flex-1'>What to do next — Learn →</span>
              <svg
                width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#7950f2' strokeWidth='2'
                className={`transition-transform duration-200 ${showLearn ? "rotate-180" : ""}`}>
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </button>

            {showLearn && learnItems.length > 0 && (
              <div className='flex flex-col gap-1.5 mt-2'>
                {learnItems.map((item) => (
                  <div
                    key={item}
                    className='flex items-start gap-2 px-3.5 py-2.5 rounded-[9px] bg-brand-bg border border-[#ddd6fe]'>
                    <span className='text-brand-violet text-xs mt-px font-bold'>·</span>
                    <span className='text-xs text-brand-foreground leading-relaxed'>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
