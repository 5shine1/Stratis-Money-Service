import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  icon: string;
  className?: string;
  textColor?: string;
  borderColor?: string;
  backColor?: string;
};
const IconBox = ({ icon, textColor, borderColor, backColor }: Props) => {
  return (
    <div
      className={`flex-none p-8 rounded-8 border ${borderColor || "border-[#192d3c]"} ${backColor || "bg-[#11212d]"}`}
    >
      <Icon icon={icon} className={`w-24 h-24 ${textColor || "text-secondary-main"} `} />
    </div>
  );
};

export default IconBox;
