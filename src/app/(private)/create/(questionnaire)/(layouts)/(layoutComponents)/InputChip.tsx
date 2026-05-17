interface InputChipProps {
  action: (option: string) => void;
  /** Exact option label from the API (e.g. "Other (please specify)") */
  optionLabel: string;
  isOther: boolean;
  otherReason: string;
  setOtherReason: (value: string) => void;
}

/**
 * "Other" option: only the label control calls `action` so taps on the text field
 * do not re-fire selection (which would clear text / steal focus on mobile).
 */
const InputChip = ({
  action,
  optionLabel,
  isOther,
  otherReason,
  setOtherReason,
}: InputChipProps) => {
  return (
    <div
      className={`border rounded-lg px-3 py-2 sm:px-5 sm:py-2 flex items-stretch gap-2 text-sm font-semibold transition bg-white min-w-0 max-w-full
                ${isOther
          ? "border-purple"
          : "border-light-grey/40 hover:border-purple"
        }
              `}>
      <button
        type='button'
        onClick={() => action(optionLabel)}
        className='text-grey shrink-0 max-w-[min(12rem,45vw)] truncate text-left cursor-pointer rounded-md px-1 py-0.5 -my-0.5 hover:bg-purple/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/40'>
        {optionLabel}
      </button>
      <span className='text-grey shrink-0 self-center select-none' aria-hidden>
        |
      </span>
      <input
        type='text'
        value={otherReason}
        onChange={(e) => {
          setOtherReason(e.target.value);
        }}
        placeholder='Specify other reason'
        className='min-w-0 flex-1 w-0 outline-none text-dark-grey placeholder:text-light-grey bg-transparent py-0.5'
        autoComplete='off'
        aria-label={`Custom answer for ${optionLabel}`}
      />
    </div>
  );
};

export default InputChip;
