import { register } from "@/services/auth/registerService";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = (options = {}) =>
  useMutation({
    mutationFn: register,
    ...options,
  });
