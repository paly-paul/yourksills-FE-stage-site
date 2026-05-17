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

const LABELS = ["Python", "SQL", "Data Viz", "ML", "Statistics", "System Design", "Stakeholder", "Jira"];

const CHART_DATA: ChartData<"bar"> = {
  labels: LABELS,
  datasets: [
    {
      label: "Current",
      data: [90, 82, 76, 64, 71, 78, 85, 80],
      backgroundColor: "rgba(128,82,254,0.85)",
      borderRadius: 6,
      borderSkipped: false as const,
      barPercentage: 0.55,
      categoryPercentage: 0.75,
    },
    {
      label: "Role Required",
      data: [85, 95, 90, 80, 85, 70, 75, 70],
      backgroundColor: "rgba(77,212,248,0.65)",
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
        font: { family: "DM Sans", size: 12 },
        boxWidth: 10,
        usePointStyle: true,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "DM Sans", size: 11 }, color: "#8792b2" },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: "rgba(0,0,0,.05)" },
      ticks: {
        font: { family: "DM Sans", size: 11 },
        color: "#8792b2",
        stepSize: 25,
      },
      border: { display: false },
    },
  },
};

const TABS: Tab[] = ["Technical skills", "Functional skills", "Behavioral skills"];

/**
 * Extract skill journey data from insights
 */
function getSkillJourneyData(
  insightsData?: SnapShotData,
  tab?: Tab
): ChartData<"bar"> {
  const skillJourney = insightsData?.results?.Skill_and_Role?.Skill_Journey;

  if (!skillJourney) {
    return CHART_DATA;
  }

  const tabToKey: Record<Tab, string> = {
    "Technical skills": "Technical",
    "Functional skills": "Functional",
    "Behavioral skills": "Behavioral",
  };

  const key = tabToKey[tab || "Technical skills"];
  const polishedCandidate = skillJourney.Polished_Candidate as unknown as Record<
    string,
    Array<{ Skill?: string; "Current (%)"?: number; "Required (%)"?: number }>
  >;

  if (!polishedCandidate || typeof polishedCandidate !== "object") {
    return CHART_DATA;
  }

  const skillData = polishedCandidate[key];

  // Ensure skillData is an array
  if (!Array.isArray(skillData) || skillData.length === 0) {
    return CHART_DATA;
  }

  // Extract skills and scores
  const labels = skillData.slice(0, 8).map((skill) => skill.Skill || "Unknown");
  const currentScores = skillData.slice(0, 8).map((skill) => {
    const val = skill["Current (%)"];
    return typeof val === "number" ? val : 0;
  });
  const requiredScores = skillData.slice(0, 8).map((skill) => {
    const val = skill["Required (%)"];
    return typeof val === "number" ? val : 0;
  });

  return {
    labels,
    datasets: [
      {
        label: "Current",
        data: currentScores,
        backgroundColor: "rgba(128,82,254,0.85)",
        borderRadius: 6,
        borderSkipped: false as const,
        barPercentage: 0.55,
        categoryPercentage: 0.75,
      },
      {
        label: "Role Required",
        data: requiredScores,
        backgroundColor: "rgba(77,212,248,0.65)",
        borderRadius: 6,
        borderSkipped: false as const,
        barPercentage: 0.55,
        categoryPercentage: 0.75,
      },
    ],
  };
}

export default function SkillJourneyChart({ insightsData, isLoading }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Functional skills");
  const chartData = getSkillJourneyData(insightsData, activeTab);

  return (
    <div className='bg-brand-surface rounded-card border border-brand-border shadow-card overflow-hidden animate-[fadeUp_0.5s_ease_0.3s_both]'>
      <div className='p-[22px]'>
        <div className='flex items-center justify-between mb-4 flex-wrap gap-3'>
          <div className='flex items-center gap-1.5 text-xs font-semibold text-brand-muted uppercase tracking-[.06em]'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
            </svg>
            Skill Journey
          </div>
          <div className='flex gap-1.5'>
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
          <div className='relative h-60'>
            <Bar data={chartData} options={CHART_OPTIONS} />
          </div>
        )}
      </div>
    </div>
  );
}
