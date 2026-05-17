import { AlternateJob } from "./getPredictModelOneService";

export interface PredictModelRequest {
  user_id: string;
  reference_id: string;
}

export interface PredictModelTwoResponse {
  "Alternate Industry_Alternate Jobs": AlternateJob[];
}

export const getPredictModelTwoService = async (
  data: PredictModelRequest
): Promise<PredictModelTwoResponse> => {
  void data;
  // const response = await aiInstance.post("/predict-model2-db", data);
  // return response.data;
  return { "Alternate Industry_Alternate Jobs": [] };
};
