/**
 * Detects "Other" style options returned by the questionnaire API
 * (e.g. "Other", "Others", "Other (please specify)").
 */
export function isOtherLikeOption(option: string | undefined | null): boolean {
  if (option == null) return false;
  const t = option.trim().toLowerCase();
  if (t === "other" || t === "others") return true;
  if (t.startsWith("other ") || t.startsWith("others ")) return true;
  if (t.includes("other") && t.includes("specify")) return true;
  return false;
}

/** Removes consecutive duplicate option strings from API responses. */
export function dedupeOptionsPreservingOrder(
  options: string[] | undefined
): string[] | undefined {
  if (!options?.length) return options;
  const out: string[] = [];
  const seen = new Set<string>();
  for (const o of options) {
    if (seen.has(o)) continue;
    seen.add(o);
    out.push(o);
  }
  return out;
}
