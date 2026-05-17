import Image from "next/image";

const TitleWithIcon = ({ image, title }: { image: string; title: string }) => {
  return (
    <header className='w-full max-w-5xl mb-6'>
      <div className='flex items-center'>
        <Image src={image || ""} alt='' width={20} height={20} className='w-[20px] h-[20px] md:w-[30px] md:h-[30px]' />
        <h1 className='text-base md:text-2xl font-semibold text-title-black ml-2 md:ml-4'>
          {title || ""}
        </h1>
      </div>
    </header>
  );
};

export default TitleWithIcon;
