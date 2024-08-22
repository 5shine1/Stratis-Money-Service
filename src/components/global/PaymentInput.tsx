import React from "react";

import { Icon } from "@iconify/react";

type Props = {
  value: string;
  onChange: (value: string) => void; //eslint-disable-line
  placeholder?: string;
  type?: string;
  icon?: string;
  error?: string;
  label?: string;
  pattern?: string;
  inputMode?: "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal";
};
const PaymentInput: React.FC<Props> = ({
  value,
  onChange,
  type = "text",
  error = "",
  icon = "",
  placeholder,
  label = "",
  pattern,
  inputMode = "text",
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {label && <span className="text-white/50 text-14">{label}</span>}
      <div
        className={`w-full border flex items-center px-12 gap-6 u-transition-color group rounded-6 ${
          error ? "border-error" : "border-secondary-200 focus-within:border-secondary-400 "
        }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`w-24 h-24 u-transition-color ${
              error ? "text-error" : "text-white group-focus-within:text-secondary-400"
            }`}
          />
        )}
        <input
          value={value}
          type={type}
          onChange={(e) => {
            if (!e.target.validity.valid) {
              return;
            }
            onChange(e.target.value);
          }}
          className="text-14 placeholder:text-white/40 py-12 w-full text-gray-200 outline-none bg-transparent "
          placeholder={placeholder}
          pattern={pattern}
          inputMode={inputMode}
        />
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
};

export default PaymentInput;
