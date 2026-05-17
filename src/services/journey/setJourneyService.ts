import authInstance from "@/utils/axiosAuthInstance";

export const setJourneyService = async (audienceType: string) => {
  const response = await authInstance.post("/proceed-without-cv", {
    audienceType,
  });
  return response.data;
};
