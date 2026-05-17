import React, { useCallback, useEffect, useRef, useState } from "react";
import WorldMap, { CountryContext, DataItem } from "react-svg-worldmap"; //https://yanivam.github.io/react-svg-worldmap/examples/text-labels/
import TitleWithIcon from "./TitleWIthIcon";
import { EnumType } from "@/common/types";
import countries from "world-countries";

interface MapData {
  country: string;
  value: string | number;
  demand: string;
}

interface SalaryData {
  mapData: MapData[];
  averageSalary: string;
  city: string;
  demand: string;
  companies: string[];
}

const getStyle = ({ }: CountryContext) => ({
  fill: "#9CA3AF",
  fillOpacity: 0.4,
  stroke: "transparent",
  cursor: "pointer",
});

const statusColors = {
  High: "#67C16B",
  Medium: "#FC8516",
  Low: "#F5E000",
};

type StatusColorsKey = EnumType<typeof statusColors>;

interface MappedCountryData {
  code: string;
  name: string;
  value: number;
  x: number;
  y: number;
  demand: string;
}

const WorldMapContainer = ({ mapData = [] }: { mapData: MapData[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<MappedCountryData[]>([]);

  // Function to compute lat/lon → x/y
  const computePositions = useCallback(() => {
    if (!containerRef.current || !mapData) return [];
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    return (mapData || [])
      .map((item) => {
        const c = countries.find((c) => c.cca2 === item?.country);
        if (!c) return null;

        const [lat, lon] = c.latlng;
        const x = ((lon + 180) / 360) * width;
        const y = ((90 - lat) / 180) * height;

        return {
          code: item?.country,
          name: c.name.common, // full country name
          value: item?.value,
          demand: item?.demand,
          x,
          y,
        };
      })
      .filter(Boolean) as {
        code: string;
        name: string;
        value: number;
        demand: string;
        x: number;
        y: number;
      }[];
  }, [mapData]);

  useEffect(() => {
    const update = () => setPositions(computePositions());
    update(); // initial render

    // Recalculate on window resize
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [computePositions]);

  return (
    <div ref={containerRef} className='relative w-full max-w-5xl mx-auto'>
      <WorldMap
        data={(mapData || []) as DataItem[]}
        size={"lg"}
        styleFunction={getStyle}
        tooltipTextFunction={() => ""}
      />
      {(positions || []).map(({ code, name, value, x, y, demand }) => (
        <div
          key={code}
          className='absolute'
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-60%, 0%)",
          }}>
          <div
            style={{
              backgroundColor: statusColors[demand as StatusColorsKey] || "#ccc",
            }}
            className={`absolute -bottom-1/2 left-1/6 h-2 w-2 rounded-full z-20`}></div>
          <div
            className="relative p-1 md:p-2 bg-white rounded-md md:rounded-xl shadow-md text-left min-w-[65px] md:min-w-[100px] z-10 
                          after:content-[''] after:absolute after:bottom-[-6px] md:after:bottom-[-10px] after:left-[6px] md:after:left-[10px] 
                          after:w-0 after:h-0 
                          after:border-l-[6px] md:after:border-l-[10px] after:border-l-transparent after:border-r-[6px] md:after:border-r-[10px] after:border-r-transparent 
                          after:border-t-[6px] md:after:border-t-[10px] after:border-t-white">
            <p className='font-bold text-black text-[8px] md:text-xs leading-none'>{value}</p>
            <p className='text-black text-[7px] md:text-xs font-extralight flex items-center mt-0.5'>
              <span
                style={{
                  backgroundColor: statusColors[demand as StatusColorsKey] || "#ccc",
                }}
                className={`inline-block h-1 w-1 md:h-1.5 md:w-1.5 rounded-full mr-1 `}></span>
              {name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MapChart = ({ salaryData }: { salaryData: SalaryData }) => {
  if (!salaryData) return null;

  return (
    <div>
      <TitleWithIcon
        image={"/icons/globe.svg"}
        title={"Geo-Opportunity Insight"}
      />
      <div className='border border-zinc-100 rounded-2xl md:rounded-[2rem] p-4 md:p-5'>
        <div className='flex justify-center mb-2 md:mb-0'>
          <div className='w-full max-w-4xl'>
            <WorldMapContainer mapData={salaryData?.mapData || []} />
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-end gap-3 md:gap-4'>
          <div className='space-y-1 text-center md:text-left'>
            <h2 className='font-bold text-xl md:text-xl text-gray-700 leading-none'>
              {salaryData?.averageSalary || ""}
            </h2>

            <div className='flex items-center justify-center md:justify-start gap-2 md:gap-3 font-medium'>
              <span className='text-neutral-500 text-[9px] md:text-[11px]'>{salaryData?.city || ""}</span>
              <span
                style={{
                  backgroundColor:
                    statusColors[salaryData?.demand as StatusColorsKey] || "#ccc",
                }}
                className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] text-white`}>
                {salaryData?.demand || ""}
              </span>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-center md:justify-start md:max-w-md gap-x-4 md:gap-x-6 gap-y-2'>
            {(salaryData?.companies || []).map((company, index) => (
              <div key={index} className='flex items-start gap-1.5 md:gap-2'>
                <span
                  className={`w-1 h-1 md:w-1 md:h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0`}
                  aria-hidden='true'
                />
                <span className={`text-[9px] md:text-[10px] text-cyan-400 leading-tight`}>
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;
