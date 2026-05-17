import Image from "next/image";

export const JobTitle = ({ title }: { title: string | undefined }) => {
  return (
    <div className='flex items-center gap-2 mb-4'>
      <Image
        src='/icons/SuitcaseSimple.svg'
        alt=''
        width={40}
        height={40}
        className='bg-icon'
      />
      <p className='text-lg text-left font-semibold text-title-black'>
        {title}
      </p>
    </div>
  );
};
