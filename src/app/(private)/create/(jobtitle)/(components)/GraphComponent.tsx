const GraphBar = (data: {
  label: string;
  percentage: number;
  color: string;
}) => {
  return (
    <div className='h-full text-center flex flex-col'>
      <span className='text-light-grey text-xs md:text-sm lg:text-sm mb-1'>
        {data.percentage}%
      </span>
      <div
        className='w-full rounded-tl-lg rounded-tr-lg mt-auto min-h-2'
        style={{
          height: `${data.percentage}%`,
          backgroundColor: data.color,
        }}></div>
      <span
        className='text-xs md:text-sm lg:text-sm font-semibold mt-2'
        style={{ color: data.color }}>
        {data.label}
      </span>
    </div>
  );
};

export const GraphComponent = ({
  data,
  heightClass,
  classes = "",
}: {
  data: { label: string; percentage: number; color: string }[];
  heightClass: string;
  classes?: string;
}) => {
  return (
    <div className={`flex flex-col justify-end-safe ${classes}`}>
      <p className='text-sm md:text-lg lg:text-lg text-indigo-950 mb-2 text-center font-medium'>
        Match Breakdown
      </p>
      <div
        className={`grid [grid-template-columns:repeat(var(--cols),minmax(0,1fr))] gap-4 xl:gap-10 items-end ${heightClass} min-h-24 md:min-h-28`}
        style={{ "--cols": data.length } as React.CSSProperties}>
        {data.map((item, index) => (
          <GraphBar
            key={index}
            label={item.label}
            percentage={item.percentage}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};
