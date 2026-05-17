import { useState } from "react";

const SkillCard = ({
  title,
  items,
  initialVisible = 3,
}: {
  title: string;
  items: string[];
  initialVisible?: number;
}) => {
  const [expanded, setExpanded] = useState(false),
    visibleItems = expanded ? items : items.slice(0, initialVisible);

  const hiddenCount = items.length - initialVisible;

  return (
    <div className='bg-violet-200/40 p-4 sm:p-5 md:p-5 lg:p-6 rounded-lg flex-shrink-0 h-full min-w-0'>
      <h2 className='text-lg sm:text-xl font-semibold mb-4 sm:mb-5 md:mb-6 text-center md:text-left'>
        {title}
      </h2>
      <div className='flex flex-wrap md:flex-col justify-center md:justify-start items-stretch sm:items-center md:items-start gap-2 sm:gap-2.5 md:gap-3'>
        {visibleItems.map((item, i) => (
          <span
            key={i}
            className='bg-white text-title-black px-3 py-1.5 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-xs md:text-[13px] font-medium shadow-sm border border-violet-100 text-center md:text-left leading-snug max-w-full break-words hyphens-none'>
            {item}
          </span>
        ))}

        {hiddenCount > 0 && (
          <span
            className='text-grey text-xs md:text-sm font-medium mt-1 cursor-pointer hover:text-indigo-600 transition-colors w-full md:w-auto text-center md:text-left'
            onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide" : `+ ${hiddenCount} More`}
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
