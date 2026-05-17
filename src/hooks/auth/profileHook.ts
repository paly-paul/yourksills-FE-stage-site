import {
  getUserProfile,
  ProfileResponse,
} from "@/services/auth/profileService";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (options = {}) => {
  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    ...options,
  });
};
