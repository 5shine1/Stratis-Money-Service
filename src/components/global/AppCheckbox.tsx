import { Icon } from "@iconify/react";
import React from "react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

const AppCheckbox: React.FC<Props> = ({ value, onChange, label }) => {
  return (
    <div
      className="flex items-center gap-6 cursor-pointer "
      onClick={() => {
        onChange(!value);
      }}
    >
      <div>
        {value ? (
          <Icon icon="mdi:checkbox-intermediate" className="w-24 h-24 text-primary-200" />
        ) : (
          <Icon icon="mdi:checkbox-blank-outline" className="w-24 h-24 text-primary-200" />
        )}
      </div>
      <div className={`${value?'text-white/90':'text-white/50'}`}>{label}</div>
    </div>
  );
};

export default AppCheckbox;
