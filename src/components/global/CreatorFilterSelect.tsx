import { dictionaryGlobal } from "@/config/dictionary";
import useAppSelector from "@/hooks/global/useAppSelector";
import useClickOutside from "@/hooks/global/useClickOutside";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type Props = {
  value: string[];
  onChange: (value: string[]) => void; //eslint-disable-line
  data: string[];
};
const CreatorFilterSelect = ({ value, onChange, data }: Props) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative w-full "
      ref={useClickOutside(() => {
        setIsOpen(false);
      })}
    >
      <div
        className="relative flex justify-between items-center gap-2 w-full bg-primary-700 rounded-6 py-12 px-16 cursor-pointer u-text-overflow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {dictionaryGlobal.creatorFilter.label[locale]}{" "}
        {value.length ? dictionaryGlobal.filtered[locale] : dictionaryGlobal.all[locale]}
        <Icon
          icon={`ep:arrow-down`}
          className={`w-16 h-16 transition-transform duration-300 ${isOpen ? " rotate-180" : ""}`}
        ></Icon>
      </div>
      <div
        className={`z-20 transition-all duration-100  absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-primary-700 text-white/70 flex flex-col overflow-y-auto  p-8 ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none "
        }`}
      >
        {data.map((item, id) => {
          return (
            <div
              className="p-8 cursor-pointer u-text-overflow rounded-4 flex items-center gap-6"
              key={id}
              onClick={() => {
                if (value.includes(item)) onChange(value.filter((i) => i !== item));
                else onChange([...value, item]);
              }}
            >
              <Icon
                icon={value.includes(item) ? "mdi:checkbox-blank-outline" : "mdi:checkbox-intermediate"}
                className="w-24 h-24 text-primary-200"
              />
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatorFilterSelect;
