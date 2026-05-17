import Image from "next/image";
import { useState } from "react";

interface TextFieldProps {
  value: string;
  label: string;
  type: "text" | "email" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  classes?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  type,
  value,
  onChange,
  isRequired,
  classes,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className='w-full space-y-1 relative'>
      {label && (
        <label className='block text-sm font-medium text-title-black'>
          {label}
        </label>
      )}
      <input
        required={isRequired}
        value={value}
        type={inputType}
        onChange={onChange}
        className={`w-full px-4 py-3 text-grey bg-white btn-shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${classes}`}
      />

      {type === "password" && (
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className={`cursor-pointer absolute top-1/2 right-3 ${classes}`}>
          <Image
            src={showPassword ? "/icons/eye-off.svg" : "/icons/eye-open.svg"}
            alt=''
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};
