import { getJobQuestionsService } from "@/services/questionnaire/getJobQuestionsService";
import { MissingQuestionsResponse } from "@/services/questionnaire/getMissingQuestionsService";
import { useQuery } from "@tanstack/react-query";

export const useGetJobQuestions = (withCv: boolean, options = {}) => {
  return useQuery<MissingQuestionsResponse, Error>({
    queryKey: ["jobQuestions", withCv],
    queryFn: () => getJobQuestionsService(withCv),
    ...options,
  });
};
