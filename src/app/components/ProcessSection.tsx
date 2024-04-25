"use client";
import React from "react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const mockData = [
  { key: "Create Account", text: "lorem" },
  { key: "KYC Verify", text: "lorem" },
  { key: "Generate Payment Link", text: "lorem" },
  { key: "Send Email", text: "lorem" },
];

const ProcessSection = () => {
  return (
    <section className="px-16 py-80 lg:py-120 relative">
      <div className="g-effect absolute -top-[200px] -z-10 -left-[800px] w-[1600px] h-[1200px] opacity-80 scale-50 lg:scale-100"></div>

      <div className="relative items-center w-full  max-w-600 lg:max-w-1440 mx-auto flex gap-80 flex-col lg:flex-row-reverse">
        <div className="w-full flex flex-col gap-32">
          <h2 className="uppercase text-center lg:text-left">
            How our platform works
          </h2>

          <p className="text-gray-400">
            Lorem ipsum is a pseudo-Latin text used in web design, typography,
            layout, and printing in place of English to emphasise design
            elements over content. It&apos; s also called placeholder (or
            filler) text.
          </p>

          <div className="flex flex-col gap-36">
            {mockData.map((item, i) => (
              <div key={i} className="flex items-center gap-16">
                <div className="rounded-full flex-none w-64 h-64 bg-gradient-to-b from-primary-400 to-secondary-200"></div>
                <div className="flex flex-col gap-4">
                  <p className="g-button-text text-24 font-semibold w-fit">
                    {item.key}
                  </p>
                  <p className=" text-gray-400">
                    Lorem ipsum is a pseudo-Latin text used in web design,
                    typography, layout, and printing in place of English to
                    emphasise design elements over content.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <AnimatedSlideButton className="text20 lg:text-24 border border-secondary-200 rounded-full w-fit mx-auto lg:mx-0 px-32 py-12 lg:px-40 lg:py-16 mt-24">
            Learn More
          </AnimatedSlideButton>
        </div>
        <div className="w-full relative p-12">
          <img
            src="/assets/landing/hero-bg.png"
            alt=""
            className="absolute w-full"
          />
          <img src="/assets/landing/hero.png" alt="" className="relative" />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
