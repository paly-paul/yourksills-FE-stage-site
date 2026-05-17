export const LetterAvatar = ({
  name,
  width,
  fontSize,
  className = "",
}: {
  name: string;
  width?: string;
  fontSize?: string;
  className?: string;
}) => {
  const style = {
    ...(width ? { width, height: width } : {}),
    ...(fontSize ? { fontSize } : {}),
  };

  return (
    <div
      style={style}
      className={`bg-purple p-2 rounded-full flex items-center justify-center text-white font-semibold ${className}`}>
      {name ? name.charAt(0).toUpperCase() : "?"}
    </div>
  );
};
