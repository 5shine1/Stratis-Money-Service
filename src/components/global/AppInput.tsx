import React from "react";

import { Icon } from "@iconify/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: string;
  error?: string;
  label?: string;
};
const AppInput: React.FC<Props> = ({
  value,
  onChange,
  type = "text",
  error = "",
  icon = "",
  placeholder,
  label = "",
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {label && <span className="text-primary-500/60 dark:text-white/50 text-14">{label}</span>}
      <div
        className={`w-full border flex items-center px-12 gap-6 u-transition-color group rounded-6 ${
          error
            ? "border-error"
            : "border-secondary-200 dark:border-primary-500 focus-within:border-secondary-400 dark:focus-within:border-primary-400"
        }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`w-24 h-24 u-transition-color ${
              error
                ? "text-error"
                : "text-secondary-400 dark:text-primary-200/80 dark:group-focus-within:text-primary-400 group-focus-within:text-secondary-400"
            }`}
          />
        )}
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          className="text-14 placeholder:text-primary-500/70 dark:placeholder:text-white/40 py-12 w-full text-primary-500 dark:text-gray-200 outline-none bg-transparent "
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
};

export default AppInput;
