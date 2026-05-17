import { setJourneyService } from "@/services/journey/setJourneyService";
import { useMutation } from "@tanstack/react-query";

export const useSetJourney = (options = {}) =>
  useMutation({
    mutationFn: setJourneyService,
    ...options,
  });
