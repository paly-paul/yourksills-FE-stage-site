const ChipSection = ({
  title,
  attributes,
}: {
  title: string;
  attributes:
  | {
    item: string;
    tag: string;
  }[]
  | undefined;
}) => {
  return (
    <div>
      <p className='font-semibold mb-2 text-left mt-4'>{title}</p>
      <div className='flex flex-wrap gap-2'>
        {attributes?.map((attr, index) => (
          <Chip key={index} tag={attr.tag} attribute={attr.item} />
        ))}
      </div>
    </div>
  );
};

const Chip = ({ tag, attribute }: { tag: string; attribute: string }) => {
  return (
    <span
      key={tag}
      className={`text-xs rounded-full p-2 text-black ${tag?.toLowerCase() === "cv"
        ? "bg-sky-300/40 "
        : tag?.toLowerCase() === "talent"
          ? "bg-lime-600/30 "
          : "bg-violet-200"
        }`}>
      {attribute}
    </span>
  );
};

interface AttributeSectionProps {
  tags: string[];
  matchAttributes: { item: string; tag: string }[] | undefined;
  skillGaps?: { item: string; tag: string }[];
}

export const AttributeSection = ({
  tags,
  matchAttributes,
  skillGaps,
}: AttributeSectionProps) => {
  return (
    <div>
      <div className='flex gap-2 mb-4 flex-wrap'>
        {tags.map((tag, index) => (
          <Chip key={index} tag={tag} attribute={tag} />
        ))}
      </div>

      <div className={`${skillGaps ? "grid grid-cols-1 lg:grid-cols-2 gap-2" : "block"}`}>
        <ChipSection title='Matching Attributes' attributes={matchAttributes} />
        {skillGaps &&
          (skillGaps.length !== 0 ? (
            <ChipSection title='Skill Gaps' attributes={skillGaps} />
          ) : (
            "No skill gaps found"
          ))}
      </div>
    </div>
  );
};
