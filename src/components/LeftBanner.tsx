import Image from "next/image";

export const LeftBanner = () => {
  return (
    <div className='md:w-1/2  flex flex-col justify-center items-center'>
      <div className='dot-bg bg-violet-50 p-10 rounded-2xl'>
        <h2 className='text-3xl md:text-3xl font-medium text-center mb-4 text-title-black'>
          Get 10X more chances of getting shortlisted!
        </h2>
        <p className='text-base text-grey text-center mb-6'>
          Create your account to understand your skills. It only takes 10
          minutes!
        </p>
        <div className='w-full max-w-md m-auto rounded-lg'>
          <Image
            src='/glimpse-screen.png'
            alt='Skill Snapshot'
            width={800}
            height={400}
            className='object-cover bg-violet-50 rounded-lg'
          />
        </div>

        <div className='flex items-center justify-center gap-3 pt-6'>
          <Image src='/avatar-trail.png' alt='user1' width={100} height={100} />
          <p className='text-base text-center text-title-black'>
            <span className='font-semibold gradient-text'>5000+</span> users
            already benefitted from Skill Snapshot
          </p>
        </div>
      </div>
    </div>
  );
};
