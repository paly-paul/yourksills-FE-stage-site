"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-xl cursor-pointer`}>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        onClick={handlePlay}>
        <source
          // src='https://www.w3schools.com/html/mov_bbb.mp4'
          src='/video/yourskills-video.mp4'
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className='cursor-pointer absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition'>
          <Image src='/icons/play.svg' alt='' width={200} height={200} />
        </button>
      )}
    </div>
  );
}
