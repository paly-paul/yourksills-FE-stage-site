export const IndustrySection = ({
  industry,
  subSector,
  seniority,
}: {
  industry: string | undefined;
  subSector: string | undefined;
  seniority: string | undefined;
}) => {
  return (
    <div className='text-sm mt-4 lg:mt-6 space-y-3 text-left'>
      <p>
        <span className='font-semibold'>Industry -</span> {industry}
      </p>
      <p>
        <span className='font-semibold'>Sub Sector-</span> {subSector}
      </p>
      <p>
        <span className='font-semibold'>Seniority Level-</span> {seniority}
      </p>
    </div>
  );
};
