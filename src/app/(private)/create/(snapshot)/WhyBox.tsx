const WhyBox = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div
      className='rounded-3xl px-2 py-6 flex-100 text-center'
      style={{ backgroundColor: `${color || "#ccc"}1A` }}>
      <div className='font-semibold text-xs md:text-sm mb-1' style={{ color: color || "#000" }}>
        {title || ""}
      </div>
      <div className='text-gray-600 text-[9px] md:text-sm'>{description || ""}</div>
    </div>
  );
};

export default WhyBox;
