"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

import { ICurrency } from "@/@types/common";
import CurrencyInput from "@/components/global/CurrencyInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const PaymentPage = () => {
  const currencies = [
    { id: "USDT", img: "/assets/icon/usdt.png" },
    { id: "USDC", img: "/assets/icon/usdc.png" },
    { id: "STRAX", img: "/assets/icon/strax.png" },
  ];
  const fiats = [
    { id: "USD", img: "/assets/icon/usd.png" },
    { id: "EUR", img: "/assets/icon/eur.png" },
  ];
  const [sendCurrentCurrency, setSendCurrentCurrency] = useState<ICurrency>({
    id: "USDT",
    img: "/assets/icon/usdt.png",
  });
  const [receiveCurrentCurrency, setReceiveCurrentCurrency] =
    useState<ICurrency>({
      id: "USD",
      img: "/assets/icon/usd.png",
    });

  return (
    <div className="min-h-full w-full flex flex-col gap-12 items-center justify-center">
      <h3> Deposit Cryptocurrency</h3>
      <div className="w-full mx-auto max-w-440 flex flex-col gap-36 mt-40">
        <div className="flex flex-col gap-16">
          <CurrencyInput
            label="You send"
            currencies={currencies}
            currentCurrency={sendCurrentCurrency}
            setCurrentCurrency={setSendCurrentCurrency}
          />
          <CurrencyInput
            label="You receive"
            currencies={fiats}
            currentCurrency={receiveCurrentCurrency}
            setCurrentCurrency={setReceiveCurrentCurrency}
          />
        </div>
        <div className="text-gray-200 flex flex-col gap-12 text-14">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Current BTC Price</span>
            <span>21324 EUR</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Slippage</span>
            <div className="flex items-center gap-4">
              0.3%
              <Icon
                icon="fluent:edit-settings-24-regular"
                className={`w-16 h-16 u-transition-color text-secondary-200 hover:text-secondary-400 cursor-pointer`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Acceptable Price</span>
            <span>21304 EUR</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total Fees</span>
            <span className="border-b border-dotted border-gray-200 cursor-pointer">
              $12.42
            </span>
          </div>
        </div>
        <AnimatedSlideButton className="text-20 p-16 w-full border border-secondary-200">
          CONTINUE
        </AnimatedSlideButton>
      </div>
    </div>
  );
};

export default PaymentPage;
