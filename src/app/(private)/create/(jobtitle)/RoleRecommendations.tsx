"use client";

import { AccentButton, BorderButton } from "@/components/CustomButton";
import { Dispatch, SetStateAction, useState, useMemo, useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  AlternateJob,
  PredictModelResponse,
} from "@/services/jobPrediction/getPredictModelOneService";
import { PredictModelTwoResponse } from "@/services/jobPrediction/getPredictModelTwoService";

import { JobTitle } from "./(components)/JobTitle";
import { MatchPercentage } from "./(components)/MatchPercentage";
import { AttributeSection } from "./(components)/AttributeSection";
import AILoader from "@/components/AILoader";


type Props = {
  setJobTitlePage: Dispatch<SetStateAction<string>>;
  onNext: () => void;
  modelOne: UseQueryResult<PredictModelResponse, Error>;
  modelTwo: UseQueryResult<PredictModelTwoResponse, Error>;
  initialType?: "same" | "alternate";
  setRoleDetail: Dispatch<SetStateAction<AlternateJob | undefined>>;
};

const RoleRecommendations = ({
  setJobTitlePage,
  modelOne,
  modelTwo,
  initialType,
  setRoleDetail,
}: Props) => {
  const isLoading = modelOne.isFetching || modelTwo.isFetching;

  const sameRoles = useMemo(
    () => modelOne.data?.["Same Industry_Alternate jobs"] || [],
    [modelOne.data]
  );

  // Build additional roles from modelTwo
  const alternateRoles = useMemo(
    () => modelTwo.data?.["Alternate Industry_Alternate Jobs"] || [],
    [modelTwo.data]
  );

  // Keep current roles list and toggle by setting roles directly
  const [roles, setRoles] = useState(sameRoles || []);
  const [currentType, setCurrentType] = useState<"same" | "alternate">();

  // Initialize roles based on what was clicked in RoleRadar
  useEffect(() => {
    setCurrentType(initialType);
    if (initialType === "alternate") {
      setRoles(alternateRoles || []);
    } else {
      setRoles(sameRoles || []);
    }
  }, [sameRoles, alternateRoles, initialType]);

  const handleRoleDetail = (role: AlternateJob) => {
    setRoleDetail(role);
    setJobTitlePage("role-detail");
  };

  const ButtonLayout = () => {
    if (currentType === "same") {
      return (
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8 lg:mt-16 px-4 lg:px-0'>
          <AccentButton
            text='Back to prediction'
            action={() => {
              setJobTitlePage("role-radar");
            }}
            classes="w-full sm:w-auto text-sm lg:text-base"
          />
          <BorderButton
            text='Explore Alternate Industry'
            action={() => {
              setRoles(alternateRoles || []);
              setCurrentType("alternate");
            }}
            classes="w-full sm:w-auto text-sm lg:text-base"
          />
        </div>
      );
    } else {
      return (
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-8 lg:mt-16 px-4 lg:px-0'>
          <AccentButton
            text='Back to prediction'
            action={() => {
              setJobTitlePage("role-radar");
            }}
            classes="w-full sm:w-auto text-sm lg:text-base"
          />
          <BorderButton
            text='Explore Same Industry'
            action={() => {
              setRoles(sameRoles || []);
              setCurrentType("same");
            }}
            classes="w-full sm:w-auto text-sm lg:text-base"
          />
        </div>
      );
    }
  };

  if (isLoading)
    return (
      <div className='w-full block mx-auto'>
        <AILoader />
      </div>
    );

  const roleCards = roles.map((role, index) => (
    <div
      onClick={() => handleRoleDetail(role)}
      key={index}
      className='cursor-pointer p-1 rounded-xl border border-light-grey/40 hover:border-transparent hover:bg-gradient-to-r hover:from-violet-500 hover:to-blue-500 transition-all duration-500'>
      <div className='rounded-lg bg-white p-4 h-full'>
        <div className='flex justify-between items-center mb-4'>
          <JobTitle title={role.job_title} />
          <MatchPercentage
            percentage={parseFloat(
              (role.overall_match_pct || "").replace("%", "")
            )}
          />
        </div>
        <div>
          <AttributeSection
            tags={["Talent", "Persona"]}
            matchAttributes={role.matched_skills.slice(0, 5).map((item) => ({
              item,
              tag: "Persona" as const,
            }))}
            skillGaps={role.missing_skills.slice(0, 5).map((item) => ({
              item,
              tag: "Persona" as const,
            }))}
          />
          {(role.matched_skills.length > 5 ||
            role.missing_skills.length > 5) && (
              <div className='text-xs text-gray-500 mt-4 text-right'>more</div>
            )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className='space-y-6 mt-8 text-center'>
      <div className='p-4 lg:p-10'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {roleCards}
        </div>
        <ButtonLayout />
      </div>
    </div>
  );
};

export default RoleRecommendations;
