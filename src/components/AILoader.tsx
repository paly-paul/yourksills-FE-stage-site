import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../public/ai-loading.json";

const AI_QUOTES = [
  "Artificial Intelligence begins where curiosity meets computation.",
  "AI transforms raw data into meaningful insight.",
  "The intelligence of machines reflects the imagination of humans.",
  "Data fuels AI, but human vision drives innovation.",
  "AI reveals patterns that human eyes might miss.",
  "Technology evolves, but intelligence multiplies with AI.",
  "AI doesn't replace thinking—it accelerates it.",
  "The smartest systems are built on human creativity.",
  "AI connects information to possibility.",
  "Every dataset holds a story waiting for AI to uncover.",
  "Intelligent machines begin with intelligent design.",
  "AI makes complexity understandable.",
  "The future is written in algorithms and imagination.",
  "Artificial Intelligence learns faster, but humans decide wiser.",
  "AI converts information into action.",
  "Innovation grows where humans and AI collaborate.",
  "The power of AI lies in discovering the unseen.",
  "AI turns billions of signals into a single insight.",
  "Where data flows, intelligence grows.",
  "AI expands what humans are capable of achieving.",
  "Algorithms learn; humans lead.",
  "AI uncovers knowledge hidden in data.",
  "The next revolution is intelligence at scale.",
  "AI helps us see the future inside the present.",
  "Smart technology begins with smart questions.",
  "Artificial Intelligence empowers decisions with precision.",
  "From patterns to predictions—that's the journey of AI.",
  "AI builds bridges between data and discovery.",
  "Intelligence grows when machines and minds collaborate.",
  "AI is the art of teaching machines to understand patterns.",
];

interface AILoaderProps {
  fullScreen?: boolean;
  className?: string;
  lottieSize?: string;
  showLottie?: boolean;
  showQuotes?: boolean;
}

const AILoader = ({ 
  fullScreen = false, 
  className = "", 
  lottieSize = "w-1/4",
  showLottie = true,
  showQuotes = true
}: AILoaderProps) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Pick a random initial quote
    setQuoteIndex(Math.floor(Math.random() * AI_QUOTES.length));

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % AI_QUOTES.length);
        setIsFading(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      {showLottie && (
        <div className={`${lottieSize} block mx-auto`}>
          <Lottie animationData={animationData} loop={true} />
        </div>
      )}
      {showQuotes && (
        <div className={`${showLottie ? "mt-8" : ""} text-center max-w-3xl min-h-[4.5rem] flex items-center justify-center px-4`}>
          <p className={`text-base md:text-lg font-normal text-grey leading-relaxed transition-all duration-500 ease-in-out ${isFading ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"}`}>
            <span className='text-purple/80 font-medium'>&quot;</span>
            {AI_QUOTES[quoteIndex]}
            <span className='text-purple/80 font-medium'>&quot;</span>
          </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default AILoader;
