import React from "react";

interface SliderComponentProps {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  min: number | undefined;
  max: number | undefined;
  label: string | undefined;
  metric: string | undefined;
  sliderActive?: boolean;
}

const SliderComponent = ({
  sliderValue,
  setSliderValue,
  min,
  max,
  label,
  metric,
  sliderActive,
}: SliderComponentProps) => {
  return (
    <React.Fragment>
      <div className='relative my-10'>
        <input
          disabled={sliderActive !== undefined && !sliderActive}
          type='range'
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className='w-14/15 accent-purple cursor-pointer'
        />
        <div className='flex justify-between text-sm text-light-grey mb-1 px-1'>
          <span>{`${min} ${label}`}</span>
          <span>{metric}</span>
          <span>{`${max} ${label}`}</span>
        </div>
      </div>
      <div className='text-sm font-bold text-title-black mb-10'>
        {sliderValue} {label}
      </div>
    </React.Fragment>
  );
};

export default SliderComponent;
