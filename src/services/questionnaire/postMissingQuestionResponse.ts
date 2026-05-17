import { PostAnswerMutationInterface } from "@/hooks/questionnaire/usePostMissingQuestionResponse";
import authInstance from "@/utils/axiosAuthInstance";
import { serializeAnswersForApi } from "@/utils/questionnaireAnswerSerialization";

export interface PostAnswerResponse {
  message: string;
  doc_id: string;
}

export const postMissingQuestionResponseService = async (
  answer: PostAnswerMutationInterface
): Promise<PostAnswerResponse> => {
  const apiUrl = answer.withCv
    ? "/missing_questions/answers"
    : "/missing-answers/without-cv";
  const response = await authInstance.post(apiUrl, {
    answers: serializeAnswersForApi(answer.answers),
  });

  return response.data;
};
