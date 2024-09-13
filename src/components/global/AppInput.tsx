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
const AppInput: React.FC<Props> = ({
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
    <div className="w-full flex flex-col gap-8">
      {label && <span className="text-input-label text-14">{label}</span>}
      <div
        className={`w-full border flex items-center u-transition-color group rounded-6 ${
          error ? "border-error" : "border-input-border focus-within:border-primary-400"
        }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`w-24 h-24 u-transition-color flex-none ml-12 ${
              error ? "text-error" : " text-input-label group-focus-within:text-primary-400 "
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
          className="text-14 placeholder:text-input-placeholder p-12 w-full text-input-text outline-none bg-transparent "
          placeholder={placeholder}
          pattern={pattern}
          inputMode={inputMode}
        />
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
};

export default AppInput;
