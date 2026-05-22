"use client";

import Image from "next/image";
import JourneyCards from "@/components/JourneyCards";
import { AccentButton, BorderButton } from "@/components/CustomButton";
import { useState } from "react";
import { useUpdateAudienceType } from "@/hooks/journey/useUpdateAudienceType";

interface EditJourneyProps {
  setEditJourney: React.Dispatch<React.SetStateAction<boolean>>;
  setJourney: React.Dispatch<React.SetStateAction<string>>;
  journey: string;
}

export default function EditJourney({
  setEditJourney,
  setJourney,
  journey,
}: EditJourneyProps) {
  const [selectedJourney, setSelectedJourney] = useState<string>(journey);
  const [error, setError] = useState("");
  const updateAudienceType = useUpdateAudienceType();

  const handleSelectJourney = () => {
    const target = selectedJourney || journey;
    if (!target) return;

    setError("");
    updateAudienceType.mutate(target, {
      onSuccess: () => {
        setJourney(target);
        setEditJourney(false);
      },
      onError: (err) => {
        const axiosErr = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosErr.response?.data?.message ||
            err.message ||
            "Failed to update audience type."
        );
      },
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center gradient-bg'>
      <div className='section-card relative bg-white rounded-3xl sm:p-10 xl:p-30 container '>
        <button
          onClick={() => setEditJourney(false)}
          className='absolute top-8 right-8 cursor-pointer'>
          <Image src='/icons/close.svg' alt='' width={20} height={20} />
        </button>

        <h2 className='text-center text-grey text-lg mb-16'>
          Select the option that matches your journey
        </h2>
        <JourneyCards journey={selectedJourney} handleClick={setSelectedJourney} />

        {error && (
          <p className='text-center text-red-600 text-sm mt-4'>{error}</p>
        )}

        <div className='flex justify-center gap-4 mt-8'>
          <AccentButton
            text={updateAudienceType.isPending ? "Saving..." : "Save"}
            action={handleSelectJourney}
            disabled={updateAudienceType.isPending}
          />
          <BorderButton text='Cancel' action={() => setEditJourney(false)} />
        </div>
      </div>
    </div>
  );
}
