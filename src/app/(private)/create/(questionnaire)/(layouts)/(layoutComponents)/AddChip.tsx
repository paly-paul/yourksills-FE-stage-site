interface AddChipProps {
  isAdding: boolean;
  newOption: string;
  setNewOption: React.Dispatch<React.SetStateAction<string>>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setOptions: (value: string[]) => void;
  options: string[];
  /**
   * Current selection used for max-item checks and for appending new tags.
   * When omitted, `options` is used (legacy callers).
   */
  selectionBase?: string[];
  setSelectedOptions?: React.Dispatch<React.SetStateAction<string[]>>;
  maxItems?: number;
}

const AddChip = ({
  isAdding,
  newOption,
  setNewOption,
  setIsAdding,
  setOptions,
  options,
  selectionBase,
  setSelectedOptions,
  maxItems,
}: AddChipProps) => {
  const base = selectionBase ?? options ?? [];
  const isAtMax = maxItems !== undefined && base.length >= maxItems;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newOption.trim()) {
        if (isAtMax) {
          setNewOption("");
          setIsAdding(false);
          return;
        }
        const next = [...base, newOption.trim()];
        setOptions(next);
        if (setSelectedOptions) setSelectedOptions(next);
      }
      setNewOption("");
      setIsAdding(false);
    } else if (e.key === "Escape") {
      setNewOption("");
      setIsAdding(false);
    }
  };

  const handleOnBlur = () => {
    setNewOption("");
    setIsAdding(false);
  };

  if (isAtMax && !isAdding) {
    return (
      <p className='text-xs text-light-grey text-center mt-3'>
        You can add up to {maxItems} items.
      </p>
    );
  }

  return isAdding ? (
    <div className='mt-3'>
      <input
        type='text'
        autoFocus
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        onBlur={handleOnBlur}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder='Type and hit Enter'
        className='px-5 py-2 border rounded-lg text-sm font-semibold border-light-grey/40 focus:outline-none focus:ring-1 focus:ring-purple focus:border-purple text-dark-grey placeholder:text-light-grey'
      />

      <p className='text-xs text-light-grey text-center mt-1'>
        Press Enter to add
      </p>
    </div>
  ) : (
    <button
      onClick={() => setIsAdding(true)}
      className='flex items-center justify-center gap-2 border mx-auto rounded-lg px-5 py-2 text-sm font-semibold transition cursor-pointer bg-white border-light-grey/40 text-dark-grey hover:border-purple mt-3'>
      <span className='text-xl leading-none'>+</span> Add
    </button>
  );
};

export default AddChip;
