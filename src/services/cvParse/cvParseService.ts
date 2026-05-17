import { UploadVariables } from "@/hooks/cvParse/useParsedData";
import axios from "axios";
import { getAuthToken } from "@/utils/cookieHelper";

export interface CVResponse {
  parsed_data: {
    Name: string;
    Email: string;
    Phone: string;
    Address: string;
    LinkedIn: string;
    Summary: string;
    Skills: {
      HardSkills: string[];
      SoftSkills: string[];
    };
    Tools: string[];
    WorkExperience: {
      Company: string;
      Role: string;
      Duration: string;
      Description: string;
    }[];
    Education: {
      Degree: string;
      Institution: string;
      Grade: string;
      Year: string;
    }[];
    Certifications: string[];
    Projects: string[];
    Languages: {
      Language: string;
      Proficiency: string;
    }[];
    Awards: string[];
    VolunteerExperience: string[];
    Hobbies: string[];
    OtherSections: string[];
    YearsOfExperience: number;
  };
  summary: { known: string[]; unknown: string[] };
  candidate: {
    name: string;
    job_role: string;
    known_percentage: number;
  };
  audienceType: string;
  message: string;
}

export const cvParseService = async ({
  file,
  id,
}: UploadVariables): Promise<CVResponse> => {
  const formData = new FormData();
  if (file) formData.append("file", file);

  const token = getAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    const trimmed = token.trim();
    headers.Authorization = trimmed.toLowerCase().startsWith("bearer ")
      ? trimmed
      : `Bearer ${trimmed}`;
  }

  // Same-origin proxy avoids browser "Network Error" from CORS / mixed content
  // when NEXT_PUBLIC_API_BASE_URL pointed at a different origin.
  const response = await axios.post<CVResponse>(
    `/api/extract-cv?user_id=${encodeURIComponent(String(id))}`,
    formData,
    {
      headers,
      withCredentials: true,
      timeout: 120_000,
    }
  );

  return response.data;
};
