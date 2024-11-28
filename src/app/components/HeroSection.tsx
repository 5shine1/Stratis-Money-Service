"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import IconBox from "@/components/global/IconBox";
import SvgTokens from "@/assets/SvgTokens";
import { dictionaryLanding } from "@/config/dictionary";
import useAppSelector from "@/hooks/global/useAppSelector";

const HeroSection = () => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <section className="relative px-16 pt-120 pb-40 lg:pt-200 lg:pb-60">
      <img src="/assets/landing/hero-pattern.png" alt="" className="absolute top-0 right-0 h-screen hidden md:block" />
      <div className="relative flex-col lg:flex-row items-center w-full max-w-600 lg:max-w-1520  mx-auto flex gap-60 xl:gap-24">
        <div className="w-full flex flex-col gap-24 lg:gap-12">
          <ScrollAnimationElement initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} duration={0.8}>
            <div className="text-36 md:text-40 lg:text-52 w-fit g-button-text text-left uppercase font-semibold leading-[1.2]">
              {dictionaryLanding.hero.title[locale]}
            </div>
          </ScrollAnimationElement>

          <ScrollAnimationElement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            delay={0.4}
          >
            <p className="text-left font-light md:font-normal md:text-16 leading-[1.5]">
              {dictionaryLanding.hero.subtitle[locale]}
            </p>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            delay={0.8}
          >
            <div className="flex flex-col gap-24 mt-8 md:mt-28">
              {dictionaryLanding.hero.featurePoints[locale].map((item, i) => (
                <div key={i} className="flex items-start gap-12">
                  <IconBox icon="ph:check-circle" borderColor="border-[#374F64]" backColor="bg-[#062A42]" />
                  <div className="flex flex-col gap-6">
                    <div className="font-semibold text-18 md:text-24">{item.key}</div>
                    <div className="text-14 md:text-16 text-[#788F99]">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimationElement>
        </div>
        <div className="p-12 w-full max-w-640 relative">
          <ScrollAnimationElement initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} duration={1}>
            <img src="/assets/landing/hero-bg.png" alt="" className="relative max-w-full" />
          </ScrollAnimationElement>
        </div>
      </div>
      <ScrollAnimationElement initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} duration={0.8} delay={1.2}>
        <div className="flex items-center gap-12 justify-center mt-120">
          <SvgTokens />
        </div>
      </ScrollAnimationElement>
    </section>
  );
};

export default HeroSection;
