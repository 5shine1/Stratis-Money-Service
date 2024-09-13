import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  icon: string;
  className?: string;
};
const IconBox = ({ icon, className }: Props) => {
  return (
    <div className="p-8 rounded-8 border border-[#192d3c] bg-[#11212d]">
      <Icon icon={icon} className={className || "w-24 h-24 text-secondary-main"} />
    </div>
  );
};

export default IconBox;
