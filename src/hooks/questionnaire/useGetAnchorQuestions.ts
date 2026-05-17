import { getAnchorQuestionsService } from "@/services/questionnaire/getAnchorQuestionsService";
import { MissingQuestionsResponse } from "@/services/questionnaire/getMissingQuestionsService";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useGetAnchorQuestions = (
  withCv: boolean,
  type: string,
  options?: UseQueryOptions<MissingQuestionsResponse, Error>
) => {
  // Local state to hold "parameter and remaining" anchor questions from separate apis (accumulated)
  const [allQuestions, setAllQuestions] =
    useState<MissingQuestionsResponse | null>(null);

  const queryResult = useQuery<MissingQuestionsResponse, Error>({
    queryKey: ["anchorQuestions", type, withCv], // queryKey includes type to refetch when it changes
    queryFn: () => getAnchorQuestionsService(type, withCv),
    ...options,
  });

  useEffect(() => {
    // Only run when query succeeds and has data
    if (queryResult.isSuccess && queryResult.data) {
      setAllQuestions((prev) => {
        // Only run when query succeeds and has data
        if (!prev) return queryResult.data;

        // Avoid duplicates: check if the first question of new data already exists in prev
        // If it does, return prev to avoid duplicates
        // If not, append new questions to prev
        const firstNewQuestionId = queryResult.data.questions[0]?.parameter;
        if (
          !firstNewQuestionId ||
          prev.questions.some((q) => q.parameter === firstNewQuestionId)
        )
          return prev;

        return {
          ...prev,
          questions: [...prev.questions, ...queryResult.data.questions],
        };
      });
    }
  }, [queryResult.isSuccess, queryResult.data]);

  // Return query result but replace its `data` with our accumulated list
  return { ...queryResult, data: allQuestions };
};
