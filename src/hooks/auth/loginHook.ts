import { login } from "@/services/auth/loginService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = (options = {}) =>
  useMutation({
    mutationFn: login,
    ...options,
  });
