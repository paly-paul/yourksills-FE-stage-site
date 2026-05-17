"use client";

import { ChartData, EnumType } from "@/common/types";
import Image from "next/image";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts";

interface ProjectManagerSummary {
  jobTitle: string;
  scheduleData: {
    time: string;
    icon: string;
    details: string[];
  }[];
  chartData: ChartData[];
  kpiData: {
    name: string;
  }[];
  toolsData: {
    name: string;
  }[];
}

const scheduleColors = {
  morning: "#FFD5001A",
  midday: "#FFA7241A",
  evening: "#206EFF1A",
};

const kpiColors = [
  "#C1AFFF33",
  "#CEFAF733",
  "#EBFFA133",
  "#C1AFFF33",
  "#CEFAF733",
  "#EBFFA133",
];
const chartColors = [
  "#1F1F58",
  "#88C7F1",
  "#8080E9",
  "#1373B6",
  "#00b6ff",
  "#1c5451",
];

type ScheduleColorsKey = EnumType<typeof scheduleColors>;

const ScheduleCard = ({
  time,
  icon,
  details,
}: {
  time: string;
  icon: string;
  details: string[];
}) => (
  <div
    style={{ backgroundColor: scheduleColors[time as ScheduleColorsKey] }}
    className={`flex md:flex-col xl:flex-row p-3 md:p-4 rounded-xl gap-3 md:gap-4 items-center md:items-start xl:items-center`}>
    <div className='flex-shrink-0 mt-0 md:mt-1'>
      <Image src={icon} alt='' width={20} height={20} className="md:w-6 md:h-6" />
    </div>
    <div className="flex flex-col flex-1">
      <h3 className='font-semibold text-lg md:text-xl text-black capitalize'>{time}</h3>
      <ul className='text-[10px] md:text-sm text-black'>
        {details.map((detail, i) => (
          <li key={i} className='flex items-start'>
            <span className='mr-1.5'>•</span>
            <span className='leading-tight'>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const DonutChart = ({ chartData }: { chartData: ChartData[] }) => (
  <div className='grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-8 items-center'>
    <div className='w-full -mr-4'>
      <ResponsiveContainer width='100%' height={200}>
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            dataKey='value'
            innerRadius={40}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}>
            {chartData.map((_, i) => (
              <Cell
                key={`cell-${i}`}
                fill={chartColors[i]}
                stroke='#fff'
                strokeWidth={2}
              />
            ))}
            <LabelList
              dataKey='value'
              position='outside'
              formatter={(value) => `${value}%`}
              fill='#000'
              fontSize={12}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div>
      <h3 className='font-semibold text-xl mb-2'>Weekly Task Mix</h3>
      <div className='space-y-2'>
        {chartData.map((item, i) => (
          <p
            key={i}
            className='font-semibold text-xs leading-relaxed'
            style={{ color: chartColors[i] }}>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const ToolCard = ({ name }: { name: string }) => (
  <div className='flex flex-col items-center justify-center p-2 md:p-3 bg-gray-100 rounded-lg min-w-[70px]'>
    <Image
      src='/icons/Wrench.svg'
      alt=''
      width={15}
      height={15}
      className='mb-1'
    />
    <span className='text-[10px] md:text-sm text-center leading-tight'>{name}</span>
  </div>
);

const ProjectManagerLayout = ({
  summary,
}: {
  summary: ProjectManagerSummary;
}): React.JSX.Element => {
  if (!summary) return <></>;
  const { jobTitle, scheduleData = [], chartData = [], kpiData = [], toolsData = [] } = summary;

  return (
    <div className='space-y-8'>
      {/* 🔹 Job Title Pill */}
      <div className='inline-flex px-4 py-1.5 bg-zinc-100 rounded-full text-xs md:text-sm font-medium text-gray-700'>
        {jobTitle}
      </div>

      {/* 🔹 Routine Cards */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {(scheduleData || []).map((item) => (
          <ScheduleCard key={item?.time} {...item} />
        ))}
      </section>

      {/* 🔹 Donut Chart and KPI Section */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-white p-2 md:p-6 flex items-center justify-start'>
          <DonutChart chartData={chartData || []} />
        </div>

        <div className='flex flex-col space-y-6 md:space-y-12'>
          <div>
            <h3 className='text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4'>KPIs</h3>
            <div className='flex flex-wrap gap-2 md:gap-3'>
              {(kpiData || []).map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: kpiColors[i % kpiColors.length],
                  }}
                  className={`px-4 py-2 md:px-8 md:py-3 rounded-lg text-xs md:text-sm`}>
                  {item?.name}
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:gap-4'>
            <h3 className='text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4'>Tools Used</h3>
            <div className='flex flex-wrap gap-2 md:gap-4'>
              {(toolsData || []).map((item, i) => (
                <ToolCard key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectManagerLayout;
