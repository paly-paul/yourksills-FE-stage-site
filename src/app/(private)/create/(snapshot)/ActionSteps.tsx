"use client";

import Image from "next/image";

export type ActionStep = {
  title: string;
  icon?: string;
  items: string[];
};

const ActionSteps = ({ steps = [] }: { steps: ActionStep[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {(steps || []).map((step, idx) => (
        <div
          key={idx}
          className='rounded-3xl border border-zinc-400/20 p-6 bg-white text-center h-full flex flex-col items-center justify-start'>
          <div className='flex items-center justify-center mb-3'>
            <Image
              src={step?.icon || ""}
              alt={step?.title || "Step"}
              width={20}
              height={20}
            />
          </div>
          <h4 className='text-md text-gray-800 font-bold mb-2'>{step?.title}</h4>
          <ul className='text-xs text-gray-600 space-y-1'>
            {(step?.items || []).map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ActionSteps;
