"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import IconBox from "@/components/global/IconBox";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryLanding } from "@/config/dictionary";

const ProcessSection = () => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <section className="px-16 py-40 lg:py-120 relative">
      <div className="relative items-center w-full  max-w-600 lg:max-w-1520 mx-auto flex gap-80 flex-col lg:flex-row">
        <div className="w-full flex flex-col gap-12">
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
          >
            <div className="text-36 md:text-40 lg:text-52 w-fit g-button-text text-left uppercase font-semibold leading-[1.2]">
              {dictionaryLanding.process.title[locale]}
            </div>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
            delay={0.3}
          >
            <p className="font-light md:font-normal">{dictionaryLanding.process.subtitle[locale]}</p>
          </ScrollAnimationElement>

          <div className="flex flex-col gap-24 mt-32">
            {dictionaryLanding.process.processStep[locale].map((item, i) => (
              <ScrollAnimationElement
                key={i}
                initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                duration={0.5}
                delay={0.3 + i * 0.2}
              >
                <div className="flex flex-col gap-24">
                  <div key={i} className="flex items-start gap-12">
                    <IconBox icon={item.icon} borderColor="border-[#374F64]" backColor="bg-[#062A42]" />
                    <div className="flex flex-col gap-6">
                      <div className="font-semibold text-18 md:text-24">{item.key}</div>
                      <div className="text-14 md:text-16 text-[#788F99]">{item.text}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationElement>
            ))}
          </div>
        </div>
        <div className="w-full relative p-12">
          <div className="bg-[#0B3740] absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full  -translate-y-1/2 w-600 h-600 pointer-event-none blur-[200px] scale-50 lg:scale-100"></div>
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: -40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.8}
          >
            <img src="/assets/landing/process-bg.png" alt="" className="w-full z-10" />
          </ScrollAnimationElement>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
