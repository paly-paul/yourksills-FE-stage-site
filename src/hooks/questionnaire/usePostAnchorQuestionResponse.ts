import { useMutation } from "@tanstack/react-query";
import { PostAnswerMutationInterface } from "./usePostMissingQuestionResponse";
import { postAnchorQuestionResponseService } from "@/services/questionnaire/postAnchorQuesitonResponse";
import { PostAnswerResponse } from "@/services/questionnaire/postMissingQuestionResponse";

export const usePostAnchorQuestionResponse = (options = {}) => {
  return useMutation<PostAnswerResponse, Error, PostAnswerMutationInterface>({
    mutationFn: postAnchorQuestionResponseService,
    onError: (error) => {
      console.error(error);
    },
    ...options,
  });
};
