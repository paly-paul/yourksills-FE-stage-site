import authInstance from "@/utils/axiosAuthInstance";

export interface JobPredictionResponse {
  success: boolean;
  jobPrediction: JobPrediction;
}

interface JobPrediction {
  jobAttributes: JobAttribute[];
  anchorAttributes: JobAttribute[];
  upskills: string[];
  forwards: string[];
}

interface JobAttribute {
  title: string;
  items: string[];
}

export const getJobPredictionService =
  async (): Promise<JobPredictionResponse> => {
    const response = await authInstance.get("/summary/model");
    return response.data;
  };
