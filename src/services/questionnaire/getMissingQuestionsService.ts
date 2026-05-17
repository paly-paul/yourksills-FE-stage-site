import { Question } from "@/app/(private)/create/(questionnaire)/QuestionSlider";
import authInstance from "@/utils/axiosAuthInstance";

export interface MissingQuestionsResponse {
  questions: Question[];
  success: boolean;
}

export const getMissingQuestionsService = async (
  withCv: boolean
): Promise<MissingQuestionsResponse> => {
  const apiUrl = withCv
    ? "/missing_questions?section=Cv%20Missing"
    : "/cv-missing-questions";

  const response = await authInstance.get(apiUrl);
  return response.data;
};
