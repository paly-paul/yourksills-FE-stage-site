import authInstance from "@/utils/axiosAuthInstance";
import { MissingQuestionsResponse } from "./getMissingQuestionsService";

export const getAnchorQuestionsService = async (
  type: string,
  withCv: boolean
): Promise<MissingQuestionsResponse> => {
  const apiUrl = withCv
    ? `/anchor-questions/${type}`
    : `/anchor-questions/${type}-without-cv`;

  const response = await authInstance.get(apiUrl);
  return response.data;
};
