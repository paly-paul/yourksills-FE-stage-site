import React, { useId } from "react";
import { LetterAvatar } from "./LetterAvatar";
import Image from "next/image";

interface ProfileProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress?: number; // 0 to 100
  imageUrl?: string;
  name: string;
}

export default function ProfileProgressRing({
  size = 160,
  strokeWidth = 8,
  progress,
  imageUrl,
  name,
}: ProfileProgressRingProps) {
  const gradientId = useId().replace(/:/g, "");
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Partial arc only (e.g. 270° → 75% of full circle)
  // const arcLength = (270 / 360) * circumference;
  const arcLength = circumference;
  const dashOffset = arcLength * (1 - (progress ?? 0) / 100);

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <svg width={size} height={size} className='rotate-[135deg]'>
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#8B5CF6' />
            <stop offset='100%' stopColor='#6366F1' />
          </linearGradient>
        </defs>

        {progress !== undefined && (
          <React.Fragment>
            {/* Background arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill='none'
              stroke='#E5E7EB'
              strokeWidth={strokeWidth}
              strokeDasharray={arcLength}
              strokeDashoffset={0}
              strokeLinecap='round'
            />

            {/* Progress arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill='none'
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={arcLength}
              strokeDashoffset={dashOffset}
              strokeLinecap='round'
            />
          </React.Fragment>
        )}
      </svg>

      {/* Profile image */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt='Anita Shen'
            width={80}
            height={80}
            className='rounded-full object-cover w-4/5 h-4/5 object-top'
          />
        ) : (
          <LetterAvatar
            name={name}
            width={`${size * 0.8}px`}
            fontSize={`${size * 0.4}px`}
          />
        )}
      </div>
    </div>
  );
}
