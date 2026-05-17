"use client";

import Image from "next/image";

interface ResumePageProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

const Resume = ({ setCurrentScreen }: ResumePageProps) => {
  const userName = "Anita";
  const progress = 40;

  return (
    <div className='container p-6 space-y-20'>
      <div className='flex items-center gap-4 mt-20'>
        <Image
          src='/avatar.png' // Replace with your actual image path
          alt=''
          width={60}
          height={60}
          className='rounded-full object-cover'
        />
        <h1 className='text-6xl font-semibold text-title-black'>
          Welcome Back, {userName}! <span className='inline-block'>👋</span>
        </h1>
      </div>

      <div className='space-y-8 max-w-3xl'>
        <h2 className='text-3xl font-semibold text-dark-grey'>
          Continue The Quiz
        </h2>

        <div className='bg-white border border-gray-200 rounded-lg p-6 grid grid-cols-[1fr_7fr_4fr] items-center'>
          <div className='text-2xl'>💡</div>
          <div>
            <h3 className='font-semibold text-2xl text-title-black'>
              Skills Assessment Quiz
            </h3>
            <div className='w-full'>
              {/* Progress bar */}
              <div className='mt-2 w-full flex items-center gap-2'>
                <div className='h-2 bg-gray-200 rounded-full flex-1'>
                  <div
                    className='h-2 rounded-full bg-purple transition-all'
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className='text-sm text-grey'>{progress}% complete</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen("upload")}
            className='cursor-pointer w-max bg-indigo-100  px-4 py-1.5 rounded-lg self-end justify-self-end flex items-center gap-2'>
            <p className='font-semibold text-dark-grey'>Resume</p>
            <Image
              src='icons/arrow-right-grey.svg'
              alt=''
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
