"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

import { ICurrency } from "@/@types/common";
import useClickOutside from "@/hooks/global/useClickOutside";

type Props = {
  label: string;
  value?: number;
  setValue?: (value: number) => void;
  currencies: ICurrency[];
  currentCurrency: ICurrency;
  setCurrentCurrency: (currency: ICurrency) => void;
};

const CurrencyInput: React.FC<Props> = ({
  label,
  value,
  setValue,
  currencies,
  currentCurrency,
  setCurrentCurrency,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-secondary-200 rounded-8 p-16 w-full flex items-center justify-between gap-16 relative"
      ref={useClickOutside(() => {
        setOpen(false);
      })}
    >
      <div className="flex flex-col gap-8 w-full">
        <span className="text-gray-400 text-14">{label}</span>
        <input className="text-24 text-white outline-none w-full  bg-transparent" placeholder="0.0" />
      </div>
      <div className="flex items-center gap-4">
        <div
          className="cursor-pointer  text-secondary-200 hover:text-secondary-400 u-transition-color"
          onClick={() => setOpen(!open)}
        >
          <Icon
            icon="mingcute:down-line"
            className={`transition-all duration-200 w-32 h-32 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`absolute z-10 backdrop-blur-xl top-full mt-8 left-0 w-full bg-secondary-200/10 flex flex-col gap-4 p-8 rounded-8 transition-all duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {currencies.map((item) => {
          return (
            <div
              key={item.currencyId}
              className={`p-8 cursor-pointer  u-transition-color rounded-4 ${
                currentCurrency.currencyId === item.currencyId ? "bg-secondary-200/20" : "hover:bg-white/10"
              }`}
              onClick={() => {
                setCurrentCurrency(item);
                setOpen(false);
              }}
            >
              <div className="w-full flex items-center gap-16">{item.currencyId}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencyInput;
