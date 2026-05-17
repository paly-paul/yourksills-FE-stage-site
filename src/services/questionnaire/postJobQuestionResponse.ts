import { PostAnswerMutationInterface } from "@/hooks/questionnaire/usePostMissingQuestionResponse";
import { PostAnswerResponse } from "./postMissingQuestionResponse";
import authInstance from "@/utils/axiosAuthInstance";
import { serializeAnswersForApi } from "@/utils/questionnaireAnswerSerialization";

const normalizeJobAnswersPayload = (
  answers: PostAnswerMutationInterface["answers"]
) => {
  return answers.map((answer) => {
    if (
      answer.parameter === "Work Values" &&
      typeof answer.value === "string"
    ) {
      return {
        ...answer,
        value: [answer.value],
      };
    }

    return answer;
  });
};

export const postJobQuestionResponseService = async (
  answer: PostAnswerMutationInterface
): Promise<PostAnswerResponse> => {
  const apiUrl = answer.withCv
    ? "/job-questions/answers"
    : "/job-questions/answers/without-cv";
  const normalizedAnswers = normalizeJobAnswersPayload(
    serializeAnswersForApi(answer.answers)
  );
  const response = await authInstance.post(apiUrl, {
    answers: normalizedAnswers,
  });

  return response.data;
};
