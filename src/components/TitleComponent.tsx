import React from "react";

type TitleProps = {
  text: string;
  gradientText: string;
  className?: string;
};

const TitleComponent: React.FC<TitleProps> = ({ text, gradientText, className }) => {
  return (
    <h2 className={`text-2xl md:text-[2.5rem] text-title-black font-semibold leading-tight text-center mb-10 ${className}`}>
      {text} <span className='gradient-text'>{gradientText}</span>
    </h2>
  );
};

export default TitleComponent;
