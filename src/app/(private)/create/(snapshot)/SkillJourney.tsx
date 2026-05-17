import React from "react";
import { TextPill } from "./SnapShotPage";

type SkillStage = {
  title: string;
  skills: string[];
};

type SkillJourneyProps = {
  title: string;
  duration: string;
  stages: SkillStage[];
  takeaway: string;
  color: string;
  progress: number;
};

const SkillJourney: React.FC<SkillJourneyProps> = ({
  title,
  duration,
  stages = [],
  takeaway,
  color,
  progress,
}) => {
  const milestoneCount = (stages || []).length;
  return (
    <div
      className='flex flex-col justify-between rounded-3xl p-6 md:p-8 xl:p-4'
      style={{ backgroundColor: `${color}1A` }}>
      <div>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm md:text-lg font-semibold text-gray-600'>{title || "Skill Journey"}</h3>
          <span className='text-[9px] md:text-sm text-indigo-700 font-semibold'>
            {duration}
          </span>
        </div>
        <div className='flex justify-between'>
          {(stages || []).map((milestone, i) => (
            <span
              key={i}
              className='mt-1 text-indigo-700 text-[9px] md:text-xs leading-relaxed'>
              {milestone?.title}
            </span>
          ))}
        </div>
        <div className='relative flex items-center mb-6'>
          <div className='absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full'></div>
          <div
            className={`absolute top-1/2 left-0 h-1 rounded-full button-gradient-bg`}
            style={{ width: `${progress || 0}%` }}></div>
          {(stages || []).map((_, i) => {
            const left = `${(i * 100) / (milestoneCount - 1 || 1)}%`;
            return (
              <React.Fragment key={i}>
                <div
                  className='absolute translate-x-[-10%] translate-y-[20%]'
                  style={{ left }}>
                  <div className='w-2 h-2 bg-black rounded-full  z-10' />
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className='flex justify-between gap-4 mb-5'>
          {(stages || []).map((milestone, i) => (
            <div key={i} className='flex flex-wrap items-start gap-1'>
              {(milestone?.skills || []).map((skill) => (
                <TextPill
                  key={skill}
                  text={skill}
                  classes={"bg-white text-[9px] md:text-xs"}
                  style={{ color }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center mt-2'>
        <span className='font-bold text-[9px] md:text-xs text-green-700 mr-2'>
          Key Takeaway
        </span>
        <span className='text-black text-[9px] md:text-xs'>{takeaway || ""}</span>
      </div>
    </div>
  );
};

export default SkillJourney;
