import type { QuestionnaireResponseType } from "@/store/useQuestionnaireResponseStore";
import { isOtherLikeOption } from "@/app/(private)/create/(questionnaire)/helper/otherOptionUtils";

type AnswerRow = {
  parameter: string;
  answer_type: string;
  value: QuestionnaireResponseType;
};

/**
 * Shapes stored in the UI (e.g. `{ selected, otherReason }`) into values the API
 * can persist — e.g. education "Degree" should be the custom text, not
 * "Other (please specify)" alone.
 */
export function serializeQuestionnaireValueForApi(
  value: QuestionnaireResponseType
): QuestionnaireResponseType {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "object" && item !== null && !Array.isArray(item)
        ? serializeQuestionnaireValueForApi(item as QuestionnaireResponseType)
        : item
    ) as QuestionnaireResponseType;
  }

  const obj = value as Record<string, unknown>;

  if ("selected" in obj && "otherReason" in obj) {
    const selected = String(obj.selected ?? "");
    const otherReason =
      typeof obj.otherReason === "string" ? obj.otherReason.trim() : "";
    if (isOtherLikeOption(selected)) {
      return otherReason || selected;
    }
    return selected;
  }

  if ("selected" in obj && "selectedField" in obj) {
    const selected = String(obj.selected ?? "");
    const selectedField = String(obj.selectedField ?? "");
    const otherFieldText =
      typeof obj.otherFieldText === "string" ? obj.otherFieldText.trim() : "";

    if (isOtherLikeOption(selectedField) && otherFieldText) {
      return { selected, selectedField: otherFieldText };
    }

    return { selected, selectedField };
  }

  return value;
}

export function serializeAnswersForApi(answers: AnswerRow[]): AnswerRow[] {
  return answers.map((row) => ({
    ...row,
    value: serializeQuestionnaireValueForApi(row.value),
  }));
}
