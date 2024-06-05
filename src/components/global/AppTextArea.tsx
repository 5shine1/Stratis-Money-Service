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
      {label && <span className="text-white/50 text-14">{label}</span>}
      <div
        className={`w-full border flex items-center gap-6 u-transition-color group rounded-6 ${
          error ? "border-error" : "border-primary-500 focus-within:border-primary-400"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="text-16 placeholder:text-white/40 py-12 px-12 w-full text-gray-200 outline-none bg-transparent "
          placeholder={placeholder}
        />
      </div>
      {error && <span className="text-error text-12 mx-12">{error}</span>}
    </div>
  );
};

export default AppTextArea;
