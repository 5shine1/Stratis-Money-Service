import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  rows?: number;
};
const AppTextArea: React.FC<Props> = ({ value, onChange, error = "", placeholder, label = "", rows = 4 }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {label && <span className="text-primary-500/60 dark:text-white/50 text-14">{label}</span>}
      <div
        className={`w-full border flex items-center gap-6 u-transition-color group rounded-6 ${
          error
            ? "border-error"
            : "border-secondary-200 dark:border-primary-500 focus-within:border-secondary-400 dark:focus-within:border-primary-400"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="text-14 placeholder:text-primary-500/70 dark:placeholder:text-white/40 py-12 px-12 w-full text-primary-500 dark:text-gray-200 outline-none bg-transparent "
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
};

export default AppTextArea;
