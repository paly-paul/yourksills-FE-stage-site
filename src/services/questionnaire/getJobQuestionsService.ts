import authInstance from "@/utils/axiosAuthInstance";
import { MissingQuestionsResponse } from "./getMissingQuestionsService";

export const getJobQuestionsService = async (
  withCv: boolean
): Promise<MissingQuestionsResponse> => {
  const apiUrl = withCv ? "/job-questions" : "/job-questions-without-cv";
  const response = await authInstance.get(apiUrl);
  return response.data;
};
