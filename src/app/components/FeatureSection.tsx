"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryLanding } from "@/config/dictionary";

const FeatureSection = () => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <section className="px-16 py-40 lg:py-120 relative">
      <div className="relative w-full  max-w-600 lg:max-w-1520 mx-auto flex items-center flex-col lg:flex-row gap-32 justify-between">
        <div className="w-full max-w-600">
          <ScrollAnimationElement initial={{ opacity: 0, y: -90 }} animate={{ opacity: 1, y: 0 }} duration={0.8}>
            <img src="/assets/landing/feature-bg.png" alt="" className="w-full max-w-full" />
          </ScrollAnimationElement>
        </div>
        <div>
          <ScrollAnimationElement
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            duration={0.5}
          >
            <div className="text-36 md:text-40 lg:text-52 w-fit g-button-text text-center lg:text-left uppercase font-semibold leading-[1.2]">
              {dictionaryLanding.feature.title[locale]}
            </div>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            duration={0.8}
            delay={0.4}
          >
            <div className="flex flex-col  gap-32 mt-24 lg:mt-60 ">
              {dictionaryLanding.feature.featurePoints[locale].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-36 pb-24 border-b border-[#213541] last:border-transparent"
                >
                  <div className="text-[#1B2B35] font-extrabold text-48 w-64">0{i + 1}</div>
                  <div className="flex flex-col gap-6">
                    <div className="font-semibold text-18 md:text-24">{item.title}</div>
                    <div className="text-14 md:text-16 text-[#788F99]">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimationElement>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
