import { useMutation } from "@tanstack/react-query";
import { PostAnswerMutationInterface } from "./usePostMissingQuestionResponse";
import { postJobQuestionResponseService } from "@/services/questionnaire/postJobQuestionResponse";
import { PostAnswerResponse } from "@/services/questionnaire/postMissingQuestionResponse";

export const usePostJobQuestionResponse = () => {
  return useMutation<PostAnswerResponse, Error, PostAnswerMutationInterface>({
    mutationFn: postJobQuestionResponseService,
    onError: (error) => {
      console.error(error);
    },
  });
};
