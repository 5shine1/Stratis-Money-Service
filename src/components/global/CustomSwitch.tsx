import React from "react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void; // eslint-disable-line
  className?: string;
  clickable?: boolean;
  activeClassName?: string;
  passiveClassName?: string;
  thumbClassName?: string;
  thumbActiveClassName?: string;
  thumbPassiveClassName?: string;
};

const CustomSwitch: React.FC<Props> = ({
  value,
  onChange,
  className,
  clickable = true,
  activeClassName,
  passiveClassName,
  thumbClassName,
  thumbActiveClassName,
  thumbPassiveClassName,
}) => {
  return (
    <div
      className={`${className || "w-32 h-16 p-2 rounded-full relative flex-none"} m-transition-color ${
        clickable ? "cursor-pointer" : ""
      } ${value ? activeClassName || "bg-secondary-100" : passiveClassName || "bg-secondary-400"}`}
      onClick={() => {
        if (!clickable) return;
        onChange(!value);
      }}
    >
      {
        <div
          className={`${thumbClassName || "w-12 h-12 absolute rounded-full"} transition-all duration-200 ${
            value ? thumbActiveClassName || "left-18 bg-primary-700" : thumbPassiveClassName || "left-2  bg-primary-600"
          }`}
        ></div>
      }
    </div>
  );
};

export default CustomSwitch;
