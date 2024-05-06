import React, { useState } from "react";
import { Icon } from "@iconify/react";

import useDarkMode from "@/hooks/global/useDarkmode";
import CustomSwitch from "@/components/global/CustomSwitch";

type Props = {
  isWrapped: boolean;
};

const SwitchDarkmode: React.FC<Props> = ({ isWrapped }) => {
  const { isDarkMode, toggleTheme } = useDarkMode();
  return (
    <div className="flex items-center">
      {!(!isWrapped && isDarkMode) && (
        <div
          className={`p-4 ${
            isWrapped
              ? ""
              : "cursor-pointer hover:bg-white/20 rounded-6 u-transition-color"
          }`}
          onClick={() => {
            if (isWrapped) return;
            toggleTheme();
          }}
        >
          <Icon icon={"carbon:sun"} className="w-20 h-20" />
        </div>
      )}
      {isWrapped && (
        <CustomSwitch
          value={isDarkMode}
          onChange={(e) => {
            toggleTheme();
          }}
        />
      )}
      {!(!isWrapped && !isDarkMode) && (
        <div
          className={`p-4 ${
            isWrapped
              ? ""
              : "cursor-pointer hover:bg-white/20 rounded-6 u-transition-color"
          }`}
          onClick={() => {
            if (isWrapped) return;
            toggleTheme();
          }}
        >
          <Icon icon={"carbon:moon"} className="w-20 h-20" />
        </div>
      )}
    </div>
  );
};

export default SwitchDarkmode;
