import Image from "next/image";
import { LinkedInProfileType } from "./UploadPage";
import { useCvFlowStore } from "@/store/useCvFlowStore";

interface AlternateOptionCardProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  linkedInProfile?: LinkedInProfileType;
}

const LinkedInPreview = ({ profile }: { profile: LinkedInProfileType }) => {
  return (
    <div className='overflow-hidden w-full mx-auto'>
      <div className='relative h-40 md:h-48'>
        <Image
          src={profile.bannerImage}
          alt='Banner'
          fill
          className='object-cover'
        />
        <div className='absolute w-24 h-24 rounded-full border-4 border-white shadow-lg bottom-0 left-1/12 translate-y-1/2'>
          <Image
            src={profile.avatar}
            alt=''
            fill
            className='rounded-full object-cover'
          />
        </div>
      </div>

      <div className='p-6 md:flex items-start gap-6 mt-10'>
        <div className='flex-1'>
          <p className='text-xl font-semibold text-title-black'>
            {profile.name}
          </p>
          <p className='text-dark-grey   text-sm mt-1'>{profile.designation}</p>
          <p className='text-grey text-sm mt-1'>{profile.location}</p>
          <p className='text-grey text-sm mt-1'>
            {profile.followers} | {profile.connections}
          </p>
        </div>
        <div className='mt-3 flex-1 space-y-4'>
          <a
            href='#'
            className='text-sm text-sky-700 font-semibold flex items-center gap-2'>
            <Image src={profile.company.logo} alt='' width={16} height={16} />
            {profile.company.name}
          </a>
          <a
            href='#'
            className='text-sm text-sky-700 font-semibold flex items-center gap-2'>
            <Image src={profile.institute.logo} alt='' width={16} height={16} />
            {profile.institute.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default function AlternateOptionCard({
  setCurrentScreen,
  linkedInProfile,
}: AlternateOptionCardProps) {
  const setWithCv = useCvFlowStore((state) => state.setWithCv);

  const proceedWiithoutCv = () => {
    setWithCv(false);
    setCurrentScreen("no-resume");
  };

  if (linkedInProfile) {
    return (
      <div className='border border-light-grey/30 rounded-lg p-4 md:p-8 w-full h-full flex flex-col justify-center'>
        <p className='font-semibold text-lg text-title-black text-center mb-4'>
          LinkedIn Preview
        </p>
        <LinkedInPreview profile={linkedInProfile} />
      </div>
    );
  }

  return (
    <div className='bg-violet-50/40 rounded-xl p-3 md:p-6 w-full h-full flex flex-col justify-center'>
      <div className='mb-2 md:mb-4 flex gap-2 items-center'>
        <Image
          src='/icons/Smiling-face.svg'
          alt=''
          width={40}
          height={40}
          className='w-6 h-6 md:w-10 md:h-10'
        />
        <p className='font-medium text-xs md:text-sm'>
          Don&apos;t have either? No problem. We&apos;ll build this out together
          under 12 minutes!
        </p>
      </div>

      <button
        onClick={proceedWiithoutCv}
        className='cursor-pointer w-full py-1.5 md:py-2 bg-white text-purple rounded-lg font-semibold btn-shadow text-xs md:text-base'>
        Proceed without LinkedIn / Resume
      </button>

      <div className='flex mt-2 md:mt-4 gap-1 items-center'>
        <Image src='/icons/Info.svg' alt='' width={15} height={15} />
        <p className='text-[10px] md:text-xs text-grey'>
          This might take a bit longer than just uploading resume.
        </p>
      </div>
    </div>
  );
}
