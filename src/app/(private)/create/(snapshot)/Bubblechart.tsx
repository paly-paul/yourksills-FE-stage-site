import React from "react";
import TitleWithIcon from "./TitleWIthIcon";

const colors = [
  "bg-indigo-500/80",
  "bg-purple-600/50",
  "bg-sky-300/50",
  "bg-lime-600/30",
];

const Chart = () => {
  const bubbles = [
    { size: "45%", position: "top-[10%] left-[5%]" },
    { size: "35%", position: "top-[30%] left-[28%]" },
    { size: "25%", position: "top-[22%] left-[55%]" },
    { size: "15%", position: "top-[38%] left-[70%]" },
  ];

  return (
    <div className='relative w-full aspect-square'>
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${colors[index]} ${bubble.position}`}
          style={{
            width: bubble.size,
            height: bubble.size,
          }}
        />
      ))}

      <div className='absolute top-[80%] left-1/2 transform -translate-x-1/2 w-3/4 mx-auto'>
        <div className='flex justify-between text-center items-end h-full'>
          <p className='text-xs text-grey/80'>Expert</p>
          <p className='text-xs text-grey/80'>Explorer</p>
          <p className='text-xs text-grey/80'>Practitioner</p>
        </div>
        <p className='text-sm text-center text-grey mt-4 w-full'>
          Skills with their next best idea.
        </p>
      </div>
    </div>
  );
};

interface Tool {
  Technology: string;
  Description: string;
}

interface ToolsData {
  Explorer: Tool[];
  Practitioner: Tool[];
  Expert: Tool[];
  Takeaway?: string;
}

const BubbleChart = ({ toolsData }: { toolsData: ToolsData }) => {
  // Extract only list-type categories (avoid "Takeaway")
  const categories = Object.entries(toolsData || {}).filter(
    ([key]) => key !== "Takeaway"
  );

  return (
    <div className='bg-[#F7F7FF] w-full p-6 md:p-8 rounded-[2rem] mt-10 md:mt-0'>
      <TitleWithIcon
        image={"/icons/ladder.svg"}
        title={"Tech-Tool Fluency Ladder"}
      />

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
        <Chart />

        <div className='flex flex-col mt-10 md:mt-0'>
          {categories.map(([category, items], index) => (
            <div key={category} className='mb-4'>
              <div className='flex items-start justify-between'>
                <p className='text-[9px] md:text-sm mb-1 text-grey'>{category}</p>
                <span
                  className={`w-10 h-1.5 rounded-full ${colors[index % colors.length]
                    } mr-4 mt-2.5`}></span>
              </div>

              <div className='space-y-3'>
                {Array.isArray(items) && items.map((item, i) => (
                  <div key={i}>
                    <p className='text-title-black text-[9px] md:text-sm leading-snug'>
                      <span className='font-semibold'>{item?.Technology}:</span>{" "}
                      {item?.Description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Takeaway Section */}
      {toolsData?.Takeaway && (
        <div className='w-full mt-12 flex items-start gap-8'>
          <h2 className='text-[9px] md:text-sm font-semibold text-green-700 flex-shrink-0'>
            Takeaway
          </h2>
          <p className='text-[9px] md:text-xs text-title-black leading-relaxed'>
            {toolsData.Takeaway}
          </p>
        </div>
      )}
    </div>
  );
};

export default BubbleChart;
