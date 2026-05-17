"use client";

import { useEffect, useState } from "react";

interface ConfidenceRingProps {
  percentage: number;
}

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ConfidenceRing({ percentage }: ConfidenceRingProps) {
  const targetOffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashOffset(targetOffset);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  return (
    <div className='relative w-20 h-20 flex-shrink-0'>
      <svg viewBox='0 0 100 100' className='w-20 h-20 -rotate-90'>
        <circle cx='50' cy='50' r={RADIUS} fill='none' stroke='rgba(255,255,255,0.15)' strokeWidth='7' />
        <circle
          cx='50'
          cy='50'
          r={RADIUS}
          fill='none'
          stroke='#a5f3fc'
          strokeWidth='7'
          strokeLinecap='round'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='text-sm font-semibold text-white leading-none'>{percentage}%</span>
        <span className='text-[9px] text-white/65 mt-0.5 font-semibold tracking-wide'>Skill</span>
      </div>
    </div>
  );
}
