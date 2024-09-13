import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  icon: string;
  textColor?: string;
  borderColor?: string;
  backColor?: string;
};
const IconBoxSm = ({ icon, textColor, borderColor, backColor }: Props) => {
  return (
    <div
      className={`flex-none p-6 rounded-8 border ${borderColor || "border-[#192d3c]"} ${backColor || "bg-[#11212d]"}`}
    >
      <Icon icon={icon} className={`w-16 h-16 ${textColor || "text-[##BDCCD8]"} `} />
    </div>
  );
};

export default IconBoxSm;
