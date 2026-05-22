import publicInstance from "@/utils/axiosPublicInstance";

export type GoogleAuthResponse = {
  success: boolean | string;
  token?: string;
  reason?: string;
  message?: string;
};

export const googleAuth = async (id_token: string): Promise<GoogleAuthResponse> => {
  const response = await publicInstance.post<GoogleAuthResponse>("/auth/google", {
    id_token,
  });
  return response.data;
};
