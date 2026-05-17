"use client";

import StepIndicator from "@/components/StepIndicator";
import LinkedInInput from "./LinkedinInput";
import AlternateOptionCard from "./AlternateOptionCard";
import Image from "next/image";
import { AccentButton } from "@/components/CustomButton";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { useProfile } from "@/hooks/auth/profileHook";
import { CVResponse } from "@/services/cvParse/cvParseService";
import { useParsedData } from "@/hooks/cvParse/useParsedData";
import Summaryloader from "./SummaryLoader";
import { useCvFlowStore } from "@/store/useCvFlowStore";

interface UploadPageProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  setExtractedInfo: React.Dispatch<
    React.SetStateAction<CVResponse | undefined>
  >;
}

export type LinkedInProfileType = {
  bannerImage: string;
  avatar: string;
  name: string;
  designation: string;
  location: string;
  followers: string;
  connections: string;
  company: { logo: string; name: string };
  institute: { logo: string; name: string };
};

const UploadPage: React.FC<UploadPageProps> = ({
  setCurrentScreen,
  setExtractedInfo,
}) => {
  const [linkedInProfile, setLinkedInProfile] = useState<LinkedInProfileType>();
  const [validation, setValidation] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { data, isLoading: isProfileLoading } = useProfile();
  const file = useCvFlowStore((state) => state.file);
  const setFile = useCvFlowStore((state) => state.setFile);

  const {
    mutate: extractInfo,
    isPending,
    isSuccess,
  } = useParsedData({
    onSuccess: (extractedInfo: CVResponse) => setExtractedInfo(extractedInfo), //set extracted info in parent component on success
  });

  const handleExtraction = async () => {
    if (!file || isPending) return;
    if (!data?.profile?.id) {
      setValidation("Please try again. We couldn’t load your profile yet.");
      return;
    }
    setValidation("");
    setShowLoader(true);
    extractInfo({ file, id: data.profile.id });
  };

  const isNextDisabled =
    file === undefined || file === null || isProfileLoading || isPending;

  // Show loader when extraction is in progress
  if (showLoader)
    return (
      <Summaryloader
        onComplete={() => setCurrentScreen("extracted-info")}
        isSuccess={isSuccess}
        isPending={isPending}
      />
    );

  return (
    <main className='min-h-screen bg-white pt-8 pb-6 md:py-12 overflow-x-hidden'>
      <div className='container mx-auto px-2 md:px-0'>
        <StepIndicator currentStep={1} setCurrentScreen={setCurrentScreen} />

        <div className='mb-2 flex flex-col md:flex-row justify-center items-center gap-2'>
          <Image
            src='/icons/Star-struck.svg'
            alt=''
            width={40}
            height={40}
            className='w-8 h-8 md:w-10 md:h-10'
          />
          <p className='text-title-black text-lg md:text-2xl font-semibold text-center md:text-left'>
            Hi! Time to discover what sets you apart
          </p>
        </div>
        <p className='text-center text-xs md:text-sm text-grey mb-4 md:mb-10 max-w-2xl mx-auto leading-normal md:leading-relaxed'>
          We get it if you have a resume or LinkedIn, you can share either one.
          But if you&apos;ve got both, even better! It helps us understand you
          more deeply.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-4 items-center'>
          <div className='space-y-4 md:space-y-8'>
            <h4 className='font-semibold text-sm md:text-lg text-title-black mb-2 md:mb-4 text-center'>
              Upload your resume to help us create your snapshot
            </h4>
            <FileUploader file={file} setFile={setFile} />
            <LinkedInInput setLinkedInProfile={setLinkedInProfile} />
            <AccentButton
              disabled={isNextDisabled}
              text={isPending ? "Processing..." : "Next"}
              classes={`mt-4 w-full !text-xs md:!text-base !py-2 md:!py-3 ${
                isNextDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              action={handleExtraction}
            />
            {validation ? (
              <p className='text-red-900 text-sm text-center mt-2'>{validation}</p>
            ) : null}
          </div>
          <p className='font-medium text-xs md:text-sm text-center text-light-grey py-1 md:py-0'>
            Or
          </p>
          <AlternateOptionCard
            setCurrentScreen={setCurrentScreen}
            linkedInProfile={linkedInProfile}
          />
        </div>
      </div>
    </main>
  );
};

export default UploadPage;
