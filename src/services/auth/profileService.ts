import authInstance from "@/utils/axiosAuthInstance";

export type ProfileResponse = {
  profile: {
    username?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    id: number;
  };
};

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const res = await authInstance.get<ProfileResponse>("/profile");
  return res.data;
};
