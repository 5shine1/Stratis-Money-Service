import React, { useState } from "react";
import { Icon } from "@iconify/react";

import useClickOutside from "@/hooks/global/useClickOutside";
import { IInputSelectItem } from "@/@types/common";

type Props = {
  value: string;
  onChange: (value: string) => void; //eslint-disable-line
  placeholder?: string;
  type?: string;
  error?: string;
  icon?: string;
  data: IInputSelectItem[];
};
const CustomSelectInput: React.FC<Props> = ({
  value,
  onChange,
  data,
  type = "text",
  error = "",
  icon = "",
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-full relative"
      ref={useClickOutside(() => {
        setIsOpen(false);
      })}
    >
      <div
        className={`w-full border-b-2 flex items-center gap-12  u-transition-color group relative ${
          error ? "border-error" : "border-primary-300/80 focus-within:border-primary-400"
        }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`absolute w-25 h-25 u-transition-color left-8 ${
              error ? "text-error" : "text-primary-300/80 group-focus-within:text-primary-400"
            }`}
          />
        )}
        <input
          value={value}
          type={type}
          readOnly
          onFocus={() => setIsOpen(true)}
          className={`text-16 placeholder:text-gray-500 p-12 w-full text-gray-200 outline-none bg-transparent ${
            icon ? "pl-40" : ""
          }`}
          placeholder={placeholder}
        />
      </div>
      {isOpen && (
        <div className="absolute bg-primary-900 w-full left-0 top-full mt-5 rounded-8 p-12 z-20 max-h-400 overflow-y-auto">
          {data.map((item, i) => {
            return (
              <div key={i}>
                {data.length > 1 && <div className="py-12">{item.group}</div>}
                <div>
                  {item.items.map((subItem, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="p-8 py-12 rounded-6 text-14 text-gray-400 cursor-pointer hover:bg-white/10"
                      onClick={() => {
                        onChange(`${i}-${j}`);
                        setIsOpen(false);
                      }}
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {error && <span className="text-error mt-4 text-12 mx-12">{error}</span>}
    </div>
  );
};

export default CustomSelectInput;
