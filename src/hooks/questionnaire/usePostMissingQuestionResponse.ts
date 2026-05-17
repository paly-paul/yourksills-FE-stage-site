"use client";
import { useMutation } from "@tanstack/react-query";
import { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";
import {
  PostAnswerResponse,
  postMissingQuestionResponseService,
} from "@/services/questionnaire/postMissingQuestionResponse";

export interface PostAnswerMutationInterface {
  withCv: boolean;
  answers: {
    parameter: string;
    answer_type: string;
    value: QuestionnaireResponseType;
  }[];
}

export const usePostMissingQuestionResponse = (options = {}) => {
  return useMutation<PostAnswerResponse, Error, PostAnswerMutationInterface>({
    mutationFn: postMissingQuestionResponseService,
    onError: (error) => {
      console.error(error);
    },
    ...options,
  });
};
