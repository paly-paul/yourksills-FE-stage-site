import { PostAnswerMutationInterface } from "@/hooks/questionnaire/usePostMissingQuestionResponse";
import { PostAnswerResponse } from "./postMissingQuestionResponse";
import authInstance from "@/utils/axiosAuthInstance";
import { serializeAnswersForApi } from "@/utils/questionnaireAnswerSerialization";

export const postAnchorQuestionResponseService = async (
  answer: PostAnswerMutationInterface
): Promise<PostAnswerResponse> => {
  const apiUrl = answer.withCv
    ? "/anchor-questions/answers"
    : "/anchor-questions/answers-without-cv";
  const response = await authInstance.post(apiUrl, {
    answers: serializeAnswersForApi(answer.answers),
  });

  return response.data;
};
