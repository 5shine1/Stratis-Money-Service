import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

import { ICurrency } from "@/@types/common";

interface Props {
  data: ICurrency[];
  value: ICurrency | null;
  isSearch?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange: (selected: ICurrency) => void; //eslint-disable-line
}

export default function AppCurrencySelect({
  data,
  value,
  isSearch = false,
  placeholder = "Select Item",
  label,
  error,
  onChange,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [list, setList] = useState<ICurrency[]>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ICurrency | null>(value);
  const [searchIndex, setSearchIndex] = useState("");

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
    setSearchIndex("");
  }, [selected]); //eslint-disable-line

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
    <div className="w-full flex flex-col gap-4">
      {label && <span className="text-white/50 text-14">{label}</span>}
      <div ref={dropdownRef} className={`relative w-full `}>
        <div
          onClick={toggleDropdown}
          className={`relative flex justify-between items-center gap-2 w-full border  rounded-6 p-12 cursor-pointer u-text-overflow text-14 ${
            error ? "border-error" : isOpen ? "border-primary-400" : "border-primary-500"
          }`}
        >
          <div
            className={`u-text-overflow w-full flex items-center gap-1 text-gray-200 ${value ? "" : "text-white/40"}`}
          >
            {value ? value.symbol : placeholder}
          </div>
          <Icon
            icon={`ep:arrow-down`}
            className={`w-16 h-16 transition-transform duration-300 text-gray-200 ${isOpen ? " rotate-180" : ""}`}
          ></Icon>
        </div>
        <div
          className={`z-20 transition-all duration-100 text-14 absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-primary-900 flex flex-col gap-4 overflow-y-auto backdrop-blur-md p-8 text-gray-200 ${
            isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          {isSearch && (
            <div className="py-1 border-b border-gray-300/20 relative">
              <input
                className=""
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
              return (
                item.symbol.toUpperCase().includes(searchIndex.toUpperCase()) ||
                item.name.toUpperCase().includes(searchIndex.toUpperCase())
              );
            })
            .map((item) => (
              <div
                key={`list-item-${item.currencyId}`}
                className={`py-12 px-10 cursor-pointer u-text-overflow rounded-4 ${
                  selected?.currencyId === item.currencyId ? "bg-primary-500/50" : "hover:bg-white/10"
                }`}
                onClick={() => {
                  setSelected(item);
                  setIsOpen(false);
                }}
              >
                <div className="u-text-overflow flex items-center gap-1">{item.symbol}</div>
              </div>
            ))}
        </div>
      </div>{" "}
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
}
