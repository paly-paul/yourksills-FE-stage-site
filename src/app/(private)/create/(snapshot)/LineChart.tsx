"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import TitleWithIcon from "./TitleWIthIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

type Role = {
  icon: string;
  points: string[];
  title: string;
  level: string;
  experience: number;
};

const colors = ["transparent", "#1373B6", "#4F46E5", "#9333EA"]; //first color is trasparent so that the first item in the data array does not show up on the chart

const RoleCard: React.FC<{ role: Role; index: number }> = ({ role, index }) => {
  const { icon, title, points } = role || { icon: "", title: "", points: [] };

  return (
    <div
      style={{ backgroundColor: `${colors[index + 1]}1A` }}
      className={`rounded-xl p-2 w-full`}>
      <div className='flex items-center gap-2 mb-2'>
        <Image src={icon || ""} alt='' width={18} height={18} />
        <h3 className='text-[9px] md:text-xs text-gray-600 font-semibold'>{title}</h3>
      </div>

      <ul className='mt-1 space-y-0.5'>
        {(points || []).map((point) => (
          <li key={point} className='flex items-center'>
            <span
              style={{ backgroundColor: colors[index + 1] }}
              className={`w-1 h-1 rounded-full mr-1.5 flex-shrink-0`}></span>
            <span className='text-gray-600 text-[8px] md:text-xs leading-tight'>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomLegend = () => {
  return (
    <div className='flex items-center justify-end md:justify-start gap-3 mb-2'>
      <div className='flex items-center gap-1'>
        <span className='w-1.5 h-1.5 rounded-full bg-gray-400 inline-block'></span>
        <span className='text-gray-400 text-[8px] md:text-xs'>Y axis- Years</span>
      </div>
      <div className='flex items-center gap-1'>
        <span className='w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block'></span>
        <span className='text-zinc-500 text-[8px] md:text-xs'>X axis- Experience Level</span>
      </div>
    </div>
  );
};

const Linechart = ({ roles = [] }: { roles: Role[] }) => {
  const [data, setData] = useState<{ level: string; years: number }[]>();
  //construct the data array for the line chart.
  useEffect(() => {
    const data = [
      { level: "", years: 0 }, // first item is set, so that the line starts from 0 without any label
      ...(roles || []).map((role) => ({
        level: role?.level || "",
        years: role?.experience || 0,
      })),
    ];
    setData(data);
  }, [roles]);

  return (
    <div className='bg-white '>
      <TitleWithIcon
        image={"/icons/arrow-up-split.svg"}
        title={"Career Path Progression"}
      />

      <div className='w-full h-[150px] md:h-[300px]'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ left: -30, right: 10, top: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke='#F3F4F6' />
            <Legend verticalAlign='top' align='left' content={CustomLegend} />
            <XAxis
              dataKey='level'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#697077", fontSize: 8 }}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 8 }}
              axisLine={false}
              tickCount={6}
              minTickGap={1}
              tickLine={false}
              allowDecimals={false}
            />
            <Line
              dataKey='years'
              stroke='#05B60E80'
              strokeWidth={1}
              dot={({ cx, cy, index }) => {
                return (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={2.5}
                    fill={colors[index]}
                    stroke={colors[index]}
                  />
                );
              }}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='flex items-center justify-center p-2'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 w-full'>
          {(roles || []).map((role, index) => (
            <RoleCard key={index} role={role} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Linechart;
