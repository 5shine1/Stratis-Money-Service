"use client";

import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import Link from "next/link";
import IconBox from "@/components/global/IconBox";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryLanding } from "@/config/dictionary";

const ConclusionSection = () => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <section className="lg:py-80 py-40 px-16">
      <div className="w-full max-w-1520 mx-auto relative">
        <ScrollAnimationElement
          initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          duration={0.5}
        >
          <div className="relative flex flex-col items-center gap-32 md:gap-40 w-full g-box-back p-24 md:p-40 border overflow-hidden border-[#07263C] rounded-20">
            <img
              src="/assets/landing/conclusion-bg.png"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
            />{" "}
            <img
              src="/assets/landing/conclusion-bg-mobile.png"
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover md:hidden"
            />
            <IconBox icon="hugeicons:dollar-receive-01" />
            <div className="w-full max-w-640 flex flex-col gap-12 text-center relative">
              <div className="g-button-text text-24 md:text-36 font-semibold w-full text-center">
                {dictionaryLanding.conclusion.title[locale]}
              </div>
              <div className="font-light md:font-normal">{dictionaryLanding.conclusion.subtitle[locale]}</div>
            </div>
            <div className="relative w-full max-w-300">
              <Link href={"/auth/register"} className="w-full">
                <button className=" text-button-text text-18 w-full font-semibold py-16 rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 mx-auto">
                  {dictionaryLanding.conclusion.signup[locale]}
                </button>
              </Link>
            </div>
          </div>
        </ScrollAnimationElement>
      </div>
    </section>
  );
};

export default ConclusionSection;
