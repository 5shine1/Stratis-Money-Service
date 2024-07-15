import React from "react";

import { Icon } from "@iconify/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  icon?: string;
};
const CustomInput: React.FC<Props> = ({ value, onChange, type = "text", error = "", icon = "", placeholder }) => {
  return (
    <div className="w-full">
      <div
        className={`w-full border-b-2 flex items-center gap-12  u-transition-color group relative ${
          error ? "border-error" : "border-primary-300/80 focus-within:border-primary-400"
        }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`absolute w-25 h-25 u-transition-color left-8 ${
              error ? "text-error" : "text-primary-300/80 group-focus-within:text-primary-400"
            }`}
          />
        )}
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          className={`text-16 placeholder:text-gray-500 p-12 w-full text-gray-200 outline-none bg-transparent ${
            icon ? "pl-40" : ""
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-error mt-4 text-12 mx-12">{error}</span>}
    </div>
  );
};

export default CustomInput;
