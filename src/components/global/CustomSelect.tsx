import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

interface ISelect {
  id: number;
  key: string;
  text: string;
  icon?: string;
}

interface Props {
  data: ISelect[];
  init: ISelect;
  mainClass?: string;
  padClass?: string;
  listClass?: string;
  inputClass?: string;
  parentClass?: string;
  isIcon?: boolean;
  isSearch?: boolean;
  onChange: (selected: ISelect) => void;
}

export default function CustomSelect({
  data,
  init,
  mainClass,
  padClass,
  listClass,
  parentClass,
  inputClass = "m-input",
  isIcon = false,
  isSearch = false,
  onChange,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [list, setList] = useState<ISelect[]>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ISelect | null>(init);
  const [searchIndex, setSearchIndex] = useState("");

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
    setSearchIndex("");
  }, [selected]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${parentClass}`}>
      <div onClick={toggleDropdown} className={`relative flex justify-between items-center gap-2 w-full ${mainClass}`}>
        <div className="u-text-overflow w-full flex items-center gap-1">
          {isIcon && <Icon icon={init.icon || "ph:star"} className="w-5 h-5" />}
          {init && init.text}
        </div>
        <Icon
          icon={`ep:arrow-down`}
          className={`w-16 h-16 transition-transform duration-300 ${isOpen ? " rotate-180" : ""}`}
        ></Icon>
      </div>
      <div
        className={`z-20 transition-all duration-100 block ${padClass} ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {isSearch && (
          <div className="py-1 border-b border-gray-300/20 relative">
            <input
              className={inputClass}
              placeholder="Search... "
              value={searchIndex}
              onChange={(e) => {
                setSearchIndex(e.target.value);
              }}
            ></input>
          </div>
        )}
        {list
          .filter((item) => {
            return item.text.toUpperCase().includes(searchIndex.toUpperCase());
          })
          .map((item) => (
            <div
              key={`list-item-${item.key}`}
              className={`${listClass} ${selected?.key === item.key ? "bg-gray-400/10" : "hover:bg-gray-400/5"}`}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
            >
              <div className="u-text-overflow flex items-center gap-1">
                {isIcon && <Icon icon={item.icon || "ph:star"} className="w-5 h-5" />}
                {item.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
