import { AccentButton } from "@/components/CustomButton";
import SkillCard from "@/components/SkillCard";
import React, { Dispatch, SetStateAction } from "react";
import { UseGetJobPrediction } from "@/hooks/jobPrediction/UseGetJobPrediction";
import AILoader from "@/components/AILoader";

const AttributeBlock = ({
  title,
  description,
  attributes,
}: {
  title: string;
  description: string;
  attributes: { title: string; items: string[] }[];
}) => {
  return (
    <section className='space-y-2'>
      <h2 className='font-semibold text-lg text-title-black text-center'>
        {title}
      </h2>
      <p className='text-center text-sm mb-6'>{description}</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {attributes.map((section, idx) => (
          <SkillCard key={idx} {...section} />
        ))}
      </div>
    </section>
  );
};

const BottomBlock = ({ title, tags }: { title: string; tags: string[] }) => {
  return (
    <div className='bg-indigo-50 rounded-xl py-4 flex flex-col lg:flex-row justify-between px-4 lg:px-10 items-center text-center lg:text-left gap-4'>
      <h3 className='font-semibold text-lg text-dark-grey'>{title}</h3>
      <div className='flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3'>
        {tags.map((tag, i) => (
          <span
            key={i}
            className='bg-white text-title-black px-4 py-1.5 rounded-full text-[11px] font-medium shadow-sm border border-indigo-100 text-center leading-tight'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const JobPrediction = ({
  setJobTitlePage,
}: {
  setJobTitlePage: Dispatch<SetStateAction<string>>;
}) => {
  const { data: jobPredictionData, isFetching } = UseGetJobPrediction();

  if (isFetching)
    return (
      <div className='w-full block mx-auto'>
        <AILoader />
      </div>
    );

  if (jobPredictionData && jobPredictionData.jobPrediction)
    return (
      <React.Fragment>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 lg:mt-16'>
          <AttributeBlock
            title='Talent Attributes'
            description='Aligns your skills and interests with future-fit roles.'
            attributes={jobPredictionData.jobPrediction.jobAttributes ?? []}
          />

          <AttributeBlock
            title='Persona Attributes'
            description='Reveals what truly drives and grounds your career.'
            attributes={jobPredictionData.jobPrediction.anchorAttributes ?? []}
          />
        </div>
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <BottomBlock
            title="Upskill's Unlocked"
            tags={jobPredictionData.jobPrediction.upskills ?? []}
          />
          <BottomBlock
            title='Moves you forward'
            tags={jobPredictionData.jobPrediction.forwards ?? []}
          />
        </div>
        <div className='w-full lg:w-max mx-auto mt-8 px-4 lg:px-0'>
          <AccentButton
            text='Generate Job Prediction'
            action={() => setJobTitlePage("role-radar")}
            classes="w-full lg:w-auto"
          />
        </div>
      </React.Fragment>
    );
};

export default JobPrediction;
