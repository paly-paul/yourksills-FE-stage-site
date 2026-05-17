import React, { useEffect, useState } from "react";
import AILoader from "@/components/AILoader";


const Summaryloader = ({
  onComplete,
  isSuccess,
  isPending,
}: {
  onComplete: () => void;
  isSuccess: boolean;
  isPending: boolean;
}) => {
  const [progress, setProgress] = useState(0);
  // Simulated upload progress bar:
  // - While `isPending` is true, increment progress gradually (faster until 85%, then slower until 90%)
  //   to give a smooth "uploading" animation before the real API finishes.
  // - When `isSuccess` becomes true, instantly jump to 100% and trigger `onComplete`
  //   after a short delay for better UX.
  // - Cleanup timers on unmount or status change to avoid memory leaks.

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPending) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const increment = prev < 75 ? 1 : 0.5;
          return Math.min(prev + increment, 90);
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      setProgress(100);
      const timeout = setTimeout(onComplete, 300);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, onComplete]);

  return (
    <div className='h-[calc(100vh-4.625rem)] relative flex flex-col items-center justify-center'>
      <div className='w-full max-w-5xl'>
        <AILoader lottieSize="w-1/4" showQuotes={false} />

        <p className='text-center text-grey mt-8 w-full text-sm font-medium uppercase tracking-wider'>
          Analyzing your skills with AI precision...
        </p>
        
        <div className='w-2/3 h-2 bg-light-grey/30 overflow-hidden mx-auto my-6 rounded-2xl'>
          <div
            className='h-full bg-purple rounded-r-2xl transition-all duration-500 ease-in-out'
            style={{ width: `${progress}%` }}
          />
        </div>

        <AILoader showLottie={false} />
      </div>
    </div>
  );
};

export default Summaryloader;
