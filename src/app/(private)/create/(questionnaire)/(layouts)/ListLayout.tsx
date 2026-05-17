"use client";

import React, { useEffect } from "react";
import { Question } from "../QuestionSlider";
import IconAndQuestionText from "./(layoutComponents)/IconAndQuestionText";
import Image from "next/image";
import { useQuestionnaireModalStore } from "@/store/useQuestionnaireModalStore";
import {
  useQuestionnaireResponseStore,
  QuestionnaireResponseType,
} from "@/store/useQuestionnaireResponseStore";

const ListLayout = ({
  question,
  existingAnswer,
}: //TODO setIsCompleted,
  {
    question: Question;
    setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    existingAnswer?: QuestionnaireResponseType;
  }) => {
  const { openModal } = useQuestionnaireModalStore();
  const setResponse = useQuestionnaireResponseStore(
    (state) => state.setResponse
  );
  const title = useQuestionnaireModalStore((state) => state.title),
    setTitle = useQuestionnaireModalStore((state) => state.setTitle),
    experience = useQuestionnaireModalStore((state) => state.experience),
    setExperience = useQuestionnaireModalStore((state) => state.setExperience),
    setQuestion = useQuestionnaireModalStore((state) => state.setQuestion);

  useEffect(() => {
    // Initialize with existing answer if available
    if (
      existingAnswer &&
      typeof existingAnswer === "object" &&
      "title" in existingAnswer &&
      "experience" in existingAnswer
    ) {
      setTitle(existingAnswer.title);
      setExperience(existingAnswer.experience);
      setQuestion(question.question);
    } else if (question.list && question.list.length > 0) {
      setTitle(question.list[0].title);
      setExperience(question.list[0].experience);
      setQuestion(question.question);
      setResponse({
        parameter: question.parameter,
        answer_type: question.type,
        value: {
          title: question.list[0].title,
          experience: question.list[0].experience,
        },
      });
    }
  }, [existingAnswer, question.list, question.question, question.parameter, question.type, setExperience, setQuestion, setResponse, setTitle]);

  return (
    <React.Fragment>
      <IconAndQuestionText question={question} />
      <div className='mt-6 bg-white rounded-xl p-4'>
        <div className='flex justify-between items-center'>
          <h3 className='font-medium text-dark-grey'>Job Overview</h3>
          <button
            onClick={() => question.list && openModal(question.list[0])}
            className='text-purple text-sm flex items-center gap-1 cursor-pointer'>
            <Image
              src='/icons/PencilSimple.svg'
              alt=''
              width={14}
              height={14}
            />
            Edit
          </button>
        </div>

        <div className='mt-4 space-y-6'>
          {question.list?.map((job, idx) => (
            <div key={idx} className='flex gap-3'>
              <Image
                src='/icons/SuitcaseSimple.svg'
                alt=''
                width={40}
                height={40}
                className='bg-icon'
              />
              <div className='text-left'>
                <p className='text-sm text-grey'>
                  {idx === 0 ? title : job.title}
                </p>
                <p className='font-semibold text-title-black'>
                  {idx === 0 ? experience : job.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListLayout;
