"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Tab = "Technical skills" | "Functional skills" | "Behavioral skills";

interface Props {
  insightsData?: SnapShotData;
  isLoading?: boolean;
}

const FALLBACK_DATA: ChartData<"bar"> = {
  labels: ["Python", "SQL", "Data Viz", "ML", "Statistics", "System Design", "Stakeholder", "Jira"],
  datasets: [
    {
      label: "Importance (%)",
      data: [90, 82, 76, 64, 71, 78, 85, 80],
      backgroundColor: "rgba(128,82,254,0.85)",
      borderRadius: 6,
      borderSkipped: false as const,
      barPercentage: 0.55,
      categoryPercentage: 0.75,
    },
  ],
};

const CHART_OPTIONS: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { family: "Outfit", size: 12 },
        boxWidth: 10,
        usePointStyle: true,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "Outfit", size: 11 }, color: "#8792b2" },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: "rgba(0,0,0,.05)" },
      ticks: {
        font: { family: "Outfit", size: 11 },
        color: "#8792b2",
        stepSize: 25,
        callback: (val) => `${val}%`,
      },
      border: { display: false },
    },
  },
};

const TABS: Tab[] = ["Technical skills", "Functional skills", "Behavioral skills"];

const TAB_COLORS: Record<Tab, string> = {
  "Technical skills": "rgba(128,82,254,0.85)",
  "Functional skills": "rgba(77,212,248,0.75)",
  "Behavioral skills": "rgba(64,192,87,0.8)",
};

const TAB_TO_CATEGORY: Record<Tab, "Hot Skills" | "Warm Skills" | "Getting There Skills"> = {
  "Technical skills": "Hot Skills",
  "Functional skills": "Warm Skills",
  "Behavioral skills": "Getting There Skills",
};

const TAB_TO_TAKEAWAY: Record<Tab, "Takeaway_ts" | "Takeaway_fs" | "Takeaway_bs"> = {
  "Technical skills": "Takeaway_ts",
  "Functional skills": "Takeaway_fs",
  "Behavioral skills": "Takeaway_bs",
};

function getSkillJourneyData(
  insightsData: SnapShotData | undefined,
  tab: Tab
): { chartData: ChartData<"bar">; takeaway: string } {
  const skillsAnalysis = insightsData?.results?.Technical_and_Career?.["Skills Analysis"];

  if (!skillsAnalysis) {
    return { chartData: FALLBACK_DATA, takeaway: "" };
  }

  const skills = skillsAnalysis[TAB_TO_CATEGORY[tab]];

  if (!Array.isArray(skills) || skills.length === 0) {
    return { chartData: FALLBACK_DATA, takeaway: "" };
  }

  const sliced = skills.slice(0, 8);

  const chartData: ChartData<"bar"> = {
    labels: sliced.map((s) => s.Skill),
    datasets: [
      {
        label: "Importance (%)",
        data: sliced.map((s) => s["Importance (%)"]),
        backgroundColor: TAB_COLORS[tab],
        borderRadius: 6,
        borderSkipped: false as const,
        barPercentage: 0.55,
        categoryPercentage: 0.75,
      },
    ],
  };

  const takeaway =
    insightsData?.results?.Skill_and_Role?.Skill_Journey?.[TAB_TO_TAKEAWAY[tab]] ?? "";

  return { chartData, takeaway };
}

export default function SkillJourneyChart({ insightsData, isLoading }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Technical skills");
  const { chartData, takeaway } = getSkillJourneyData(insightsData, activeTab);

  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.3s_both]'>
      <div className='p-4 sm:p-[22px]'>
        <div className='flex items-center justify-between mb-4 flex-wrap gap-3'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-blue uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
            </svg>
            Skill Journey
          </div>
          <div className='flex gap-1.5 flex-wrap justify-end'>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-[#eef1ff] text-brand-blue"
                    : "bg-brand-bg border border-brand-border text-brand-text hover:bg-[#eef1ff] hover:border-brand-indigo hover:text-brand-blue"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-16'>
            <p className='text-sm text-brand-muted'>Loading skill journey...</p>
          </div>
        ) : (
          <>
            <div className='relative h-48 sm:h-60'>
              <Bar data={chartData} options={CHART_OPTIONS} />
            </div>

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
