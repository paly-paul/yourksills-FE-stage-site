import InputChip from "./InputChip";
import { isOtherLikeOption } from "../../helper/otherOptionUtils";

interface OptionsProps {
  options: string[] | undefined;
  action: (
    option: string
  ) => void | React.Dispatch<React.SetStateAction<string | null>>;
  selectedOptions?: string[];
  selected?: string | null;
  type?: string;
  setOtherReason?: (value: string) => void;
  isOther?: boolean;
  otherReason?: string;
  limit?: number;
}

const Options = ({
  options,
  type,
  action,
  selectedOptions,
  selected,
  setOtherReason,
  isOther,
  otherReason,
  limit,
}: OptionsProps) => {
  const isMultiSelect =
    type !== "Single Select" &&
    type !== "Single-select + Dropdown" &&
    type !== "single-input" &&
    type !== "Yes/ No select + Text entry";

  const effectiveLimit = isMultiSelect ? Math.min(limit ?? 3, 3) : undefined;

  const isMaxReached =
    isMultiSelect &&
    effectiveLimit !== undefined &&
    (selectedOptions?.length ?? 0) >= effectiveLimit;

  const handleSelect = (isDisabled: boolean, option: string) => {
    if (isDisabled) return;
    action(option);
  };

  return (
    <div className='flex flex-wrap justify-center gap-3'>
      {options?.map((option, index) => {
        const isSelected = isMultiSelect
          ? selectedOptions?.includes(option)
          : selected === option;

        const isDisabled = isMultiSelect && !isSelected && isMaxReached;

        if (isOtherLikeOption(option) && setOtherReason) {
          return (
            <InputChip
              key={`other-like-${option}`}
              optionLabel={option}
              action={action}
              isOther={isOther ?? false}
              otherReason={otherReason ?? ""}
              setOtherReason={setOtherReason}
            />
          );
        }

        return (
          <button
            key={index}
            type='button'
            onClick={() => {
              handleSelect(isDisabled, option);
            }}
            disabled={isDisabled}
            className={[
              "border rounded-lg px-5 py-2 text-sm font-semibold transition",
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              isSelected
                ? "bg-purple text-white border-purple"
                : "bg-white border-light-grey/40 text-dark-grey hover:border-purple",
            ].join(" ")}>
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
