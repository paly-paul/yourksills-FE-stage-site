import { googleAuth, GoogleAuthResponse } from "@/services/auth/googleAuthService";
import { useMutation } from "@tanstack/react-query";

export const useGoogleAuth = () =>
  useMutation<GoogleAuthResponse, Error, string>({
    mutationFn: googleAuth,
  });
