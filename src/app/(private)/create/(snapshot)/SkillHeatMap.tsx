"use client";
import React from "react";

export interface SkillItem {
  name: string;
  value: number;
  level?: string; // e.g., "Expert", "Beginner" (optional)
}

export interface SkillGroup {
  color: string; // Tailwind gradient classes like "from-[#FF6B6B] to-[#FF8E53]"
  skills: SkillItem[];
}

export interface SkillHeatmapData {
  [category: string]: SkillGroup; // e.g., "Hot Skills", "Warm Skills", "Getting There Skills"
}

const SkillHeatmap = ({ skills }: { skills: SkillHeatmapData }) => {
  const groups = Object.entries(skills || {}).map(([title, group]) => ({
    title,
    color: group?.color || "from-gray-400 to-gray-500",
    skills: group?.skills || [],
  }));

  if (groups.length === 0) return null;

  return (
    <section className='w-full'>
      <div className='flex flex-col xl:flex-row justify-between gap-8 xl:gap-2 relative xl:items-end'>
        <p className='hidden xl:block absolute bottom-0 -left-4 origin-left -rotate-90 text-stone-400 text-xs'>
          Fit Level & Market Demand
        </p>
        {groups.map((group) => (
          <div key={group.title} className='flex-1 w-full'>
            <h3
              className={`text-left xl:text-center text-[10px] xl:text-xs bg-gradient-to-r ${group.color} bg-clip-text text-transparent mb-4 xl:mb-8 font-bold xl:font-normal uppercase xl:capitalize tracking-wider xl:tracking-normal`}>
              {group.title}
            </h3>

            <div
              className='flex flex-col xl:grid xl:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] gap-4 xl:gap-2 items-stretch xl:items-end xl:pb-14'
              style={{ "--cols": (group.skills || []).length } as React.CSSProperties}>
              {(group.skills || []).map((skill) => (
                <div key={skill?.name} className='relative flex flex-col xl:block'>
                  {/* Desktop View - Restored */}
                  <div className='hidden xl:block w-full'>
                    <p className='text-xs font-light text-stone-400 text-center'>
                      {skill?.value || 0}%{skill?.level && ` (${skill.level})`}
                    </p>
                    <div
                      className={`rounded-t-lg bg-gradient-to-t ${group.color} transition-all`}
                      style={{ height: `${(skill?.value || 0) * 1.5}px` }}></div>
                    <p
                      className={`absolute top-full mt-2 bg-zinc-50 text-[12px] left-1/2 [transform:translateX(-50%)_rotate(-90deg)] rounded-sm p-1 w-max`}>
                      {skill?.name}
                    </p>
                  </div>

                  {/* Mobile View - Kept as improved */}
                  <div className='xl:hidden flex items-center gap-3 w-full'>
                    <p className='text-[10px] font-medium text-gray-700 w-24 flex-shrink-0 truncate'>
                      {skill?.name}
                    </p>
                    <div className='flex-1 h-3 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className={`h-full bg-gradient-to-r ${group.color} transition-all`}
                        style={{ width: `${skill?.value || 0}%` }}></div>
                    </div>
                    <p className='text-[10px] font-bold text-stone-500 w-10 text-right'>
                      {skill?.value || 0}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillHeatmap;
