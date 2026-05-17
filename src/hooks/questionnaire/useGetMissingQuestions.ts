import {
  getMissingQuestionsService,
  MissingQuestionsResponse,
} from "@/services/questionnaire/getMissingQuestionsService";
import { useQuery } from "@tanstack/react-query";

export const useGetMissingQuestions = (withCv: boolean, options = {}) => {
  return useQuery<MissingQuestionsResponse, Error>({
    queryKey: ["missingQuestions", withCv],
    queryFn: () => getMissingQuestionsService(withCv),
    ...options,
  });
};
