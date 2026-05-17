import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { LinkedInProfileType } from "./UploadPage";
import { LinkedInProfile } from "@/utils/api-response";

export default function LinkedInInput({
  setLinkedInProfile,
}: {
  setLinkedInProfile: (data: LinkedInProfileType | undefined) => void;
}) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "verified">("idle");
  const [hovered, setHovered] = useState(false);

  const isValidLinkedIn = useCallback((url: string) => {
    return url.includes("linkedin.com");
  }, []);

  const handleVerify = useCallback(async () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("verified");
      setLinkedInProfile(LinkedInProfile);
    }, 2000);
  }, [setLinkedInProfile]);

  const handleClear = () => {
    setLinkedinUrl("");
    setStatus("idle");
    setLinkedInProfile(undefined);
  };

  useEffect(() => {
    if (isValidLinkedIn(linkedinUrl)) {
      console.log(linkedinUrl);
      handleVerify();
    } else {
      setStatus("idle");
    }
  }, [linkedinUrl, handleVerify, isValidLinkedIn]);

  return (
    <div className='w-full mt-4 md:mt-10'>
      <label className='block text-sm md:text-lg font-semibold text-zinc-400 mb-1 md:mb-2 text-center'>
        Paste your LinkedIn profile
      </label>
      <p className='text-center text-[11px] md:text-xs text-zinc-400 mb-2 md:mb-3'>
        Coming soon
      </p>
      <div
        className='relative w-full'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <input
          type='url'
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder='Paste your LinkedIn profile URL (Coming soon)'
          disabled
          className='w-full px-3 md:px-4 py-2 md:py-3 border border-zinc-200 rounded-lg bg-zinc-100 text-xs md:text-sm text-zinc-400 cursor-not-allowed'
        />
        {linkedinUrl && (
          <span className='absolute right-3 top-2 md:top-2.5 cursor-pointer'>
            {status === "loading" ? (
              <Image src='icons/loading.svg' alt='' width={20} height={20} />
            ) : hovered ? (
              <Image
                src='icons/XCircle.svg'
                alt=''
                width={20}
                height={20}
                onClick={handleClear}
              />
            ) : status === "verified" ? (
              <Image
                src='icons/CheckCircleGreen.svg'
                alt=''
                width={20}
                height={20}
              />
            ) : (
              ""
            )}
          </span>
        )}
      </div>
    </div>
  );
}
