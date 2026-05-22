import authInstance from "@/utils/axiosAuthInstance";

export type UpdateAudienceTypeResponse = {
  success: boolean;
  selectedAudienceType: string;
};

export const updateAudienceType = async (
  audienceType: string
): Promise<UpdateAudienceTypeResponse> => {
  const response = await authInstance.post<UpdateAudienceTypeResponse>(
    "/update-audience-type",
    { audienceType }
  );
  return response.data;
};
