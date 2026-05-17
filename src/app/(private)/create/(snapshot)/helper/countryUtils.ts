import countries from "world-countries";

/**
 * Gets the ISO 3166-1 alpha-2 country code from a country name
 */
export const getCountryCode = (countryName: string): string => {
  const normalized = countryName.toLowerCase();

  const match = countries.find(
    (c) =>
      c.name.common.toLowerCase() === normalized ||
      c.name.official.toLowerCase() === normalized ||
      c.altSpellings.some((alt) => alt.toLowerCase() === normalized)
  );

  return match?.cca2 || countryName.slice(0, 2).toUpperCase();
};

/**
 * Parses a country package string to extract salary and country information
 * Handles multi-word country names like "United Kingdom"
 */
export const parseCountryPackage = (pkg: string) => {
  const parts = pkg.trim().split(" ");

  // Walk backwards to find a valid country match
  for (let i = parts.length - 1; i >= 0; i--) {
    const possibleCountry = parts.slice(i).join(" ");

    const match = countries.find(
      (c) =>
        c.name.common.toLowerCase() === possibleCountry.toLowerCase() ||
        c.name.official.toLowerCase() === possibleCountry.toLowerCase() ||
        c.altSpellings.some(
          (alt) => alt.toLowerCase() === possibleCountry.toLowerCase()
        )
    );

    if (match) {
      const salary = parts.slice(0, i).join(" ").trim();
      return {
        salary,
        countryName: match.name.common,
        countryCode: match.cca2,
      };
    }
  }

  // Fallback: last part is country
  const simpleCountry = parts.slice(-1)[0];
  return {
    salary: parts.slice(0, -1).join(" "),
    countryName: simpleCountry,
    countryCode: getCountryCode(simpleCountry),
  };
};

/**
 * Determines demand level based on country frequency
 */
export const getDemandByFrequency = (
  countryCounts: Record<string, number>,
  countryCode: string
): string => {
  const count = countryCounts[countryCode] || 1;

  if (count >= 3) return "High";
  if (count === 2) return "Medium";
  return "Low";
};

/**
 * Processes an array of country package strings into structured map data
 */
export const processCountryPackages = (countryPackages: string[]) => {
  const parsedPackages = countryPackages.map(parseCountryPackage);

  // Count frequency of each country code
  const countryCounts = parsedPackages.reduce((acc, item) => {
    if (!acc[item.countryCode]) acc[item.countryCode] = 0;
    acc[item.countryCode]++;
    return acc;
  }, {} as Record<string, number>);

  // Build mapData array with frequency-based demand
  return parsedPackages.map((item) => ({
    country: item.countryCode,
    value: item.salary || "—",
    demand: getDemandByFrequency(countryCounts, item.countryCode),
  }));
};
