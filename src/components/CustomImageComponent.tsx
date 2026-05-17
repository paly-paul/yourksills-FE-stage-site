import Image from "next/image";
import React from "react";

type ImageProps = {
  src: string;
};

const CustomImageComponent: React.FC<ImageProps> = ({ src }) => {
  return (
    <div className='relative w-full h-full'>
      <Image src={src} alt='' fill className='object-contain' />
    </div>
  );
};

export default CustomImageComponent;
