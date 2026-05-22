import {
  editProfile,
  EditProfilePayload,
  EditProfileResponse,
} from "@/services/auth/editProfileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<EditProfileResponse, Error, EditProfilePayload>({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
