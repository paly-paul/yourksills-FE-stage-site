import authInstance from "@/utils/axiosAuthInstance";

export type EditProfilePayload = {
  first_name: string;
  last_name: string;
  email: string;
  current_password?: string;
  new_password?: string;
};

export type EditProfileResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export const editProfile = async (
  data: EditProfilePayload
): Promise<EditProfileResponse> => {
  const response = await authInstance.put<EditProfileResponse>(
    "/edit-profile",
    data
  );
  return response.data;
};
