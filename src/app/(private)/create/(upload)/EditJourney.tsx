"use client";

import Image from "next/image";
import JourneyCards from "@/components/JourneyCards";
import { AccentButton, BorderButton } from "@/components/CustomButton";
import { useState } from "react";

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
  const [selectedJourney, setSelectedJourney] = useState<string>("");
  const handleSelectJourney = () => {
    setJourney(selectedJourney);
    setEditJourney(false);
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
        <JourneyCards journey={journey} handleClick={setSelectedJourney} />
        <div className='flex justify-center gap-4 mt-8'>
          <AccentButton text='Save' action={handleSelectJourney} />
          <BorderButton text='Cancel' action={() => setEditJourney(false)} />
        </div>
      </div>
    </div>
  );
}
