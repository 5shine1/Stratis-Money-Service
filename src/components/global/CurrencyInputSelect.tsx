import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";

import { ICurrency } from "@/@types/common";

interface Props {
  data: ICurrency[];
  value: ICurrency;
  amount: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onAmountChange: (amount: string) => void; //eslint-disable-line
  onSelectChange: (selected: ICurrency) => void; //eslint-disable-line
}

export default function CurrencyInputSelect({
  data,
  value,
  amount,
  placeholder,
  label,
  error,
  onAmountChange,
  onSelectChange,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [list, setList] = useState<ICurrency[]>(data);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setList(data);
  }, [data]);

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
      <div ref={dropdownRef} className={`relative w-full `}>
        <div
          className={`relative flex items-center gap-2 w-full border  rounded-6 text-14 ${
            error
              ? "border-error"
              : isOpen
              ? "border-input-border"
              : "border-input-border focus-within:border-[#3C5D71]"
          }`}
        >
          <input
            value={amount}
            onChange={(e) => {
              if (!e.target.validity.valid) {
                return;
              }
              onAmountChange(e.target.value);
            }}
            className="text-14 placeholder:text-input-placeholder p-12 w-full text-input-text outline-none bg-transparent "
            placeholder={placeholder}
            pattern="^([0-9]+(?:[.,][0-9]*)?)$"
            inputMode="decimal"
          />
          <div
            className={`relative flex items-center gap-6 rounded-t-6 cursor-pointer p-12 border border-b-0 -mr-1 -mt-1 ${
              isOpen ? "bg-[#192C37]  border-[#213541]" : "border-transparent"
            }`}
            onClick={toggleDropdown}
          >
            <span className={` text-input-text font-semibold`}>{value?.symbol}</span>
            <Icon
              icon={`ep:arrow-down`}
              className={`w-16 h-16 transition-transform duration-300 text-gray-200 ${isOpen ? " rotate-180" : ""}`}
            ></Icon>
            <div
              className={`z-20 transition-all duration-100 text-14 absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-b-6 bg-[#192C37] overflow-y-auto text-input-text border-[#213541] border border-t-0 box-content -ml-1 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {list.map((item) => (
                <div
                  key={`list-item-${item.currencyId}`}
                  className={`py-12 px-10 cursor-pointer u-text-overflow border-t border-[#213541]`}
                  onClick={() => {
                    onSelectChange(item);
                    setIsOpen(false);
                  }}
                >
                  <div className="u-text-overflow flex items-center gap-1">{item.symbol}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {error && <span className="text-error text-12 mx-6">{error}</span>}
    </div>
  );
}
