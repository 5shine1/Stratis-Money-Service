"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomSelect from "@/components/global/CustomSelect";

const PaymentPage = () => {
  const currencies = [
    { id: 0, key: "usdt", text: "USDT" },
    { id: 1, key: "strx", text: "STRX" },
  ];
  const [isCurrencySelected, setIsCurrencySelected] = useState(false);
  const [isFinished] = useState(false);
  const [currency, setCurrency] = useState(0);
  return (
    <div className="flex flex-col gap-32">
      <Link href={"/"} className="flex items-center gap-16 justify-center">
        <SvgLogoApp className="w-48 h-48 !fill-secondary-200" /> <h4 className="hidden sm:block">Stratis Payment</h4>
      </Link>
      {!isCurrencySelected ? (
        <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col md:flex-row gap-32 w-full max-w-1000">
          <div className="flex flex-col items-start gap-24">
            {!isFinished && (
              <div className="border border-success text-success bg-success/5 rounded-6 p-12 text-center w-fit">
                This transaction already processed.
              </div>
            )}

            <div className="text-24">
              johndoe@stratisplatform.com <span className="text-white/50">has requested</span> jahndoe@gmail.com{" "}
              <span className="text-white/50">to pay</span> 100 USD.
            </div>
            <div className=" text-16 text-white/60">Kevin - Big Yatch #1</div>
          </div>
          <div className="w-full max-w-360 flex flex-col gap-24">
            <div>
              <div className="mb-4">Select currency you want to pay</div>
              <CustomSelect
                data={currencies}
                init={currencies[currency]}
                onChange={(selected) => {
                  setCurrency(selected.id);
                }}
                mainClass="border border-secondary-200 bg-secondary-200/10 rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-secondary-200/20 flex flex-col gap-4 overflow-y-auto backdrop-blur-md z-10 p-8"
                listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
              ></CustomSelect>
            </div>
            <div className="flex flex-col gap-16">
              <AnimatedSlideButton
                onClick={() => {
                  setIsCurrencySelected(true);
                }}
                className=" text-20 border border-secondary-300 rounded-full py-16 px-48"
              >
                Continue
              </AnimatedSlideButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col gap-32 w-full max-w-1000">
          <div className="flex gap-24  items-start flex-col md:flex-row">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                <span className="text-white/70">Amount</span>
                <span className="text-24 font-bold">100 USDT</span>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-white/70">Deposit Address</span>
                <span className="text-18 font-bold hidden md:block">0xDF9682a681f64CE0e971E630EF55a84903ecF751</span>
                <span className="text-18 font-bold md:hidden">0xDF961...cF751</span>
              </div>
              <p className="text-error mt-12 text-14">
                Be careful when choosing a network and currency when sending cryptocurrency. If you send cryptocurrency
                over the wrong network or wrong curreyncy, then your money will not be credited or returned.
              </p>
            </div>
            <div className="w-full max-w-300 border-4 border-secondary-200 ">
              <QRCode
                value={`ethereum:0x1231232123213?value=100`}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full max-w-600 mx-auto py-24">
            <div className="relative">
              <Icon icon={"eos-icons:loading"} className="w-32 h-32" />
              <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4">
                Deposit
              </span>
            </div>
            <hr className="border-white/30 w-full" />
            <div className="relative">
              <Icon icon={"eos-icons:loading"} className="w-32 h-32" />
              <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4">
                Confirm
              </span>
            </div>
            <hr className="border-white/30 w-full" />
            <div className="relative">
              <Icon icon={"eos-icons:loading"} className="w-32 h-32" />
              <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4">
                Success
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
