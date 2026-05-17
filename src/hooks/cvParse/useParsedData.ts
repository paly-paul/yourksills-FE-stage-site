"use client";
import { useMutation } from "@tanstack/react-query";
import { cvParseService, CVResponse } from "@/services/cvParse/cvParseService";

export interface UploadVariables {
  file: File | null;
  id: number;
}

export const useParsedData = (options = {}) => {
  return useMutation<CVResponse, Error, UploadVariables>({
    mutationFn: cvParseService,
    onError: (error) => {
      console.error("Upload failed:", error);
    },
    ...options,
  });
};
