import Image from "next/image";
import TitleWithIcon from "./TitleWIthIcon";

interface SkillPillarData {
  skills: string[];
  doing: string[];
  outcome: string[];
  takeaway: string;
}

interface CardInterface {
  text: string;
  color?: string;
  className?: string;
}

const PillarCard = ({ text, color, className }: CardInterface) => (
  <div
    style={{ backgroundColor: color || "#1F1F58" }}
    className={`rounded-lg p-3 text-center text-white w-full max-w-32 ${className}`}>
    <p className='text-xs'>{text}</p>
  </div>
);

const Pillar = ({
  cards = [],
  label,
  className,
  alignment = "items-center",
}: {
  cards: string[];
  label: string;
  className: string;
  alignment?: "items-center" | "items-start";
}) => {
  return (
    <div className={`flex flex-col ${alignment} gap-4`}>
      <h3 className='text-xs md:text-sm text-neutral-800 font-medium'>{label}</h3>
      <div className={`flex flex-col ${alignment} gap-1 w-full`}>
        {(cards || []).map((item, index) => (
          <PillarCard
            key={index}
            text={item}
            className={className}
            color={["#AAAAF0", "#5656E2", "#313189", "#1F1F58"][index % 4]}
          />
        ))}
      </div>
    </div>
  );
};

const PillarChart = ({
  skills = [],
  doing = [],
  outcome = [],
  takeaway = "",
}: SkillPillarData) => {
  return (
    <div className='bg-[#F7F7FF] w-full p-6 md:p-8 rounded-[2rem]'>
      <TitleWithIcon
        image={"/icons/SuitcaseSimple.svg"}
        title={"Value Creation Framework"}
      />

      <div className='flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-4'>
        <Pillar
          cards={skills}
          label={"WHAT YOU DO"}
          className={"bg-violet-50"}
          alignment='items-start'
        />

        <div className='hidden lg:flex items-center'>
          <Image src={"/icons/arrow-right.svg"} alt='' width={16} height={16} />
        </div>

        <Pillar cards={doing} label={"WHY IT MATTERS"} className={"bg-sky-50"} />

        <div className='hidden lg:flex items-center'>
          <Image src={"/icons/arrow-right.svg"} alt='' width={16} height={16} />
        </div>

        <Pillar
          cards={outcome}
          label={"BUSINESS OUTCOME"}
          className={"bg-emerald-50"}
          alignment='items-start'
        />
      </div>

      {/* ✅ Takeaway Section */}
      <div className='w-full mt-10 flex items-start gap-8 border-t border-zinc-200 pt-6'>
        <h2 className='text-[9px] md:text-sm font-semibold text-green-700 flex-shrink-0 '>
          Takeaway
        </h2>
        <p className='text-[9px] md:text-xs text-title-black leading-relaxed'>{takeaway || ""}</p>
      </div>
    </div>
  );
};
export default PillarChart;
