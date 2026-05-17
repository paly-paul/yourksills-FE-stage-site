import Image from "next/image";
import React from "react";
import { Question } from "../../QuestionSlider";

const IconAndQuestionText = ({ question }: { question: Question }) => {
  return (
    <div className='mb-4 md:mb-10'>
      <div className='flex justify-center mb-2 md:mb-4'>
        <Image
          src={`icons/${question.iconfilename.toLowerCase()}.png`}
          alt='Icon'
          width={50}
          height={50}
          className="w-10 h-10 md:w-[50px] md:h-[50px]"
        />
      </div>

      <h2 className='text-base font-semibold text-neutral-800 leading-snug'>
        {question.question}
      </h2>
      {question.limit && (
        <p className=' text-light-grey text-xs font-medium'>
          Pick any {question.limit}
        </p>
      )}
    </div>
  );
};

export default IconAndQuestionText;
