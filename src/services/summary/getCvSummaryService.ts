import authInstance from "@/utils/axiosAuthInstance";

interface CvDetails {
  name: string;
  role: string;
  Summary: string;
  hard_skills: string[] | null;
  soft_skills: string[] | null;
  tools: string[] | null;
  education: {
    Degree: string;
    Institution: string;
    Grade: string;
    Year: string;
  }[];
  career_overview: number;
  certifications: { Name: string; Issuer: string; Year: string }[] | null;
}

export interface CvApiResponse {
  success: boolean;
  cv_details: CvDetails;
}

export const getCvSummaryService = async (
  withCv: boolean
): Promise<CvApiResponse> => {
  const apiUrl = withCv ? "/cv/latest/details" : "/cv/summary/without";
  const response = await authInstance.get(apiUrl);
  return response.data;
};
