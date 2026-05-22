import {
  updateAudienceType,
  UpdateAudienceTypeResponse,
} from "@/services/journey/updateAudienceTypeService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAudienceType = () =>
  useMutation<UpdateAudienceTypeResponse, Error, string>({
    mutationFn: updateAudienceType,
  });
