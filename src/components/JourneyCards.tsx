import Image from "next/image";
import { useEffect, useState } from "react";

interface JourneyCardProps {
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
  journey?: number;
}

const JourneyCard = ({
  title,
  description,
  image,
  isActive,
  onClick,
}: JourneyCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full h-full transition-all rounded-xl border ${isActive
        ? "bg-gradient-to-r from-indigo-400 to-purple-500 border-transparent p-0.5"
        : "bg-transparent border-gray-200 hover:border-purple "
        }`}>
      <div className='rounded-xl bg-white h-full flex flex-col text-center'>
        <div className='overflow-hidden rounded-t-xl h-48 w-full relative'>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={100}
            className='object-contain w-full h-full'
          />
        </div>
        <div className='py-4 px-2 w-[90%] mx-auto flex flex-col flex-1'>
          <div className='min-h-[3.5rem] flex items-center justify-center'>
            <h3 className='font-semibold text-base text-blue-950 leading-tight'>{title}</h3>
          </div>
          <p className='text-xs text-grey mt-2 flex-1'>{description}</p>
        </div>
      </div>
    </div>
  );
};

interface JourneyCardsProps {
  handleClick: (title: string) => void;
  journey?: string;
}

const journeyOptions = [
  {
    title: "Student",
    description: "You're exploring your future career path.",
    image: "/student.png",
  },
  {
    title: "Early Professional (2-3 years of experience)",
    description: "You're in your initial 2-3 years of experience",
    image: "/early.png",
  },
  {
    title: "Mid Career Pivot",
    description: "You're exploring new paths and need clarity",
    image: "/mid-career.png",
  },
  {
    title: "Job Seeker",
    description: "You're applying and looking to shine",
    image: "/job-seeker.png",
  },
];

const JourneyCards = ({ journey, handleClick }: JourneyCardsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    // Initialize activeIndex based on journey prop
    if (journey) {
      const index = journeyOptions.findIndex(
        (option) =>
          option.title.toLowerCase().trim() === journey.toLowerCase().trim()
      );
      return index !== -1 ? index : null;
    }
    return null;
  });

  useEffect(() => {
    if (journey !== undefined) {
      const index = journeyOptions.findIndex(
        (option) =>
          option.title.toLowerCase().trim() === journey.toLowerCase().trim()
      );
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [journey]);

  const clickHandler = (title: string, index: number) => {
    handleClick(title);
    setActiveIndex(index);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full'>
      {journeyOptions.map((option, idx) => (
        <JourneyCard
          key={option.title}
          title={option.title}
          description={option.description}
          image={option.image}
          isActive={activeIndex === idx}
          onClick={() => clickHandler(option.title, idx)}
        />
      ))}
    </div>
  );
};

export default JourneyCards;
