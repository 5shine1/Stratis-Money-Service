import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { LOCALES } from "@/config/constants";

interface Props {
  label: string;
  error?: string;
  value: string;
  onChange: (selected: string) => void; // eslint-disable-line
}

export default function LanguageSelect({ value, onChange, label, error }: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <div className="w-full flex flex-col gap-8">
      {label && <span className="text-input-label text-14">{label}</span>}
      <div ref={dropdownRef} className={`relative w-full }`}>
        <div
          onClick={toggleDropdown}
          className={` text-14 relative flex justify-between items-center gap-2 w-full border rounded-6 p-12 cursor-pointer ${
            error ? "border-error" : isOpen ? "border-[#3C5D71]" : "border-input-border "
          }`}
        >
          <div className="u-text-overflow w-full flex items-center gap-8">{value}</div>
          <Icon
            icon={`ep:arrow-down`}
            className={`w-16 h-16 transition-transform duration-300 ${isOpen ? " rotate-180" : ""}`}
          ></Icon>
        </div>
        <div
          className={`z-20 absolute w-full mt-4 top-full left-0 transition-all duration-100 block bg-[#192C37] rounded-6 border border-[#213541] ${
            isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          {LOCALES.map((item) => (
            <div
              key={`list-item-${item.code}`}
              className={`p-12 text-14 border-t border-[#213541] first:border-none cursor-pointer`}
              onClick={() => {
                onChange(item.code);
                setIsOpen(false);
              }}
            >
              {item.lang} ({item.code})
            </div>
          ))}
        </div>
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
}
