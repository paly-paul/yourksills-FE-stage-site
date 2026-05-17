export const MatchPercentage = ({ percentage }: { percentage: number }) => {
  const matchcolor =
    percentage >= 80
      ? "text-green-700"
      : percentage >= 40
        ? "text-yellow-600"
        : "text-red-700";
  return (
    <span className={`font-semibold text-xl md:text-2xl ${matchcolor}`}>
      {percentage}% Match
    </span>
  );
};
