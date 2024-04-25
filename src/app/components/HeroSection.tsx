"use client";
import React from "react";
import { Icon } from "@iconify/react";

const mockData = [
  { key: "Only 1%", text: "the lowest fee on the  market" },
  { key: "Withdraw Fiat", text: "to your bank account" },
  { key: "24/7", text: "personal account management service" },
];

const HeroSection = () => {
  return (
    <section className="relative px-16 pt-120 pb-80 lg:pt-200 lg:pb-200">
      <div className="g-effect absolute -top-[600px] -left-[600px] w-[1600px] h-[1600px] scale-50 lg:scale-100"></div>

      <div className="relative flex-col lg:flex-row items-center w-full max-w-600 lg:max-w-1440  mx-auto flex gap-60 xl:gap-120">
        <div className="w-full flex flex-col gap-32 lg:gap-56">
          <h1 className="text-center lg:text-left">Your Header Text Here</h1>

          <p className="text-center lg:text-left text-gray-400">
            Lorem ipsum is a pseudo-Latin text used in web design, typography,
            layout, and printing in place of English to emphasise design
            elements over content. It&apos; s also called placeholder (or
            filler) text.
          </p>

          <div className="flex flex-col lg:gap-16 gap-8 max-w-480 mx-auto lg:mx-0 lg:max-w-none">
            {mockData.map((item, i) => (
              <div key={i} className="flex items-start gap-8">
                <Icon
                  icon={"lets-icons:check-fill"}
                  className="flex-none lg:h-32 lg:w-32 w-24 h-24 text-primary-400"
                />
                <p className="text-18 lg:text-24 font-semibold text-gray-200">
                  <span className="text-primary-400">{item.key} </span> -{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-12 lg:gap-24">
            <Icon
              icon={"logos:bitcoin"}
              className="w-36 lg:w-50 h-36 lg:h-50"
            />
            <Icon
              icon={"logos:ethereum"}
              className="w-36 lg:w-50 h-36 lg:h-50"
            />
            <Icon
              icon={"cryptocurrency-color:usdt"}
              className="w-36 lg:w-50 h-36 lg:h-50"
            />
            <Icon
              icon={"cryptocurrency-color:usdc"}
              className="w-36 lg:w-50 h-36 lg:h-50"
            />
            <Icon
              icon={"cryptocurrency-color:bnb"}
              className="w-36 lg:w-50 h-36 lg:h-50"
            />
          </div>
        </div>
        <div className="w-full p-12 relative">
          <img
            src="/assets/landing/hero-bg.png"
            alt=""
            className="absolute w-full"
          />
          <img src="/assets/landing/hero.png" alt="" className="relative" />
        </div>
      </div>
      <div className="relative  w-full max-w-600 lg:max-w-1440  mx-auto">
        <div className="absolute w-100 h-100 lg:w-120 lg:h-120  left-80 -top-60 lg:left-1/2 lg:-top-30 -translate-x-1/2 ">
          <div className=" border-2 w-full h-full border-gray-200 rounded-full cursor-pointer overflow-hidden group peer hover:border-primary-300 u-transition-color ">
            <div className="w-full h-full absolute top-0 left-0 animate-spinSlow text-12 group-hover:text-primary-400 u-transition-color overflow-hidden">
              {"GET STARTED GET STARTED".split("").map((text, i) => {
                return (
                  <div
                    className="absolute w-full h-full text-center p-6"
                    style={{ rotate: `${14.8 * i - 2}deg` }}
                    key={i}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
              <Icon
                icon={"icon-park-outline:arrow-up"}
                className="w-48 h-48 rotate-45 group-hover:text-primary-300 u-transition-color"
              />
            </div>
          </div>
          <div className="absolute w-full h-full border-2 border-transparent peer-hover:border-primary-300/20 rounded-full top-0 left-0 peer-hover:animate-pingSlow pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
