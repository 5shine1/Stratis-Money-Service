"use client";
import React, { useState } from "react";
import SvgLogoApp from "@/assets/SvgLogoApp";
import { Icon } from "@iconify/react";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomSelect from "@/components/global/CustomSelect";

const PaymentPage = () => {
  const currencies = [
    { id: 0, key: "usdt", text: "USDT" },
    { id: 1, key: "strx", text: "STRX" },
  ];
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currency, setCurrency] = useState(0);
  return (
    <>
      {!isStarted ? (
        <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col gap-32 w-full max-w-500">
          <div className="flex items-center gap-16 justify-center">
            <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
            <h4 className="hidden sm:block">Stratis Payment</h4>
          </div>
          {isFinished && (
            <div className="border border-success text-success bg-success/5 rounded-6 p-12 text-center w-fit mx-auto">
              This transaction already processed.
            </div>
          )}
          <div className="text-error text-center text-28 md:text-36 font-bold">$4000 USD</div>
          <div className="flex items-center justify-evenly flex-col sm:flex-row gap-16">
            <div className="flex flex-col items-center">
              <span className="text-white/60">From</span>
              <span className="text-secondary-200 text-20 font-bold gap-8">John Doe</span>
            </div>
            <Icon icon="el:arrow-right" className="w-24 h-24 text-white/60 rotate-90 sm:rotate-0" />
            <div className="flex flex-col items-center">
              <span className="text-white/60">To</span>
              <span className="text-secondary-200 text-20 font-bold gap-8">Jahn Doe</span>
            </div>
          </div>
          <div>
            Lorem ipsum is a pseudo-Latin text used in web design, layout, typography, layout, and printing in place of
            English to design elements over content. It is also called placeholder (or filler) text...
          </div>
          {!isFinished &&
            (!isKycVerified ? (
              <div className="flex flex-col gap-16">
                <span className="text-center text-error text-14">You have to pass KYC verification first.</span>
                <AnimatedSlideButton
                  onClick={() => {
                    setIsKycVerified(true);
                  }}
                  className=" text-20 border border-secondary-300 rounded-full py-16 px-48"
                >
                  Start KYC
                </AnimatedSlideButton>
              </div>
            ) : (
              <>
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
                <div className="flex flex-col gap-16">
                  <span className="text-center text-success text-14">KYC verification passed.</span>{" "}
                  <AnimatedSlideButton
                    onClick={() => {
                      setIsStarted(true);
                    }}
                    className=" text-20 border border-secondary-300 rounded-full py-16 px-48"
                  >
                    Start Payment
                  </AnimatedSlideButton>
                </div>
              </>
            ))}
        </div>
      ) : (
        <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col gap-32 w-full max-w-500">
          <div className="flex items-center gap-16 justify-center">
            <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
            <h4 className="hidden sm:block">Stratis Payment</h4>
          </div>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-32">
              <div className="flex flex-col gap-8">
                <span className="text-white/70">1. Check the currency</span>
                <div className="w-full border border-secondary-200 bg-secondary-200/5 rounded-8 p-12 u-text-overflow">
                  USDT <span className="text-white/50">ERC-20</span>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-white/70">2. Check the amount</span>
                <div className="w-full border border-secondary-200 bg-secondary-200/5 rounded-8 p-12 u-text-overflow">
                  4000 <span className="text-white/50">USDT</span>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-white/70"> 3. Send to this address</span>
                <div className="w-full border border-secondary-200 bg-secondary-200/5 rounded-8 p-12 u-text-overflow">
                  0x12345678901234568901234895
                </div>
              </div>
            </div>
            <div className="text-right text-14">
              Expired in <span className="text-error">00:00:35</span>
            </div>
            <div className="border border-error bg-error/10 rounded-6 p-16">
              <div className="text-error font-bold">Check the network and currency again</div>
              <p className="text-white/80 mt-8 text-14">
                Be careful when choosing a network and currency when sending cryptocurrency. If you send cryptocurrency
                over the wrong network or wrong curreyncy, then your money will not be credited or returned.
              </p>
            </div>
            {/* <AnimatedSlideButton
              onClick={() => {
                setIsKycVerified(true);
              }}
              className=" text-20 border border-secondary-300 rounded-full py-16 px-48"
            >
              Start KYC
            </AnimatedSlideButton> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
