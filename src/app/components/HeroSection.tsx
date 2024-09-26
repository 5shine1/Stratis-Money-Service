"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import IconBox from "@/components/global/IconBox";
import SvgTokens from "@/assets/SvgTokens";

const featurePoints = [
  { key: "Instant Settlement", text: "crypto-assets are immediately liquidated and credited to your account" },
  { key: "Withdraw Fiat", text: "to your business banking account" },
  { key: "Simplified Payments", text: "effortlessly share payment links via Email or SMS" },
];

const HeroSection = () => {
  return (
    <section className="relative px-16 pt-120 pb-40 lg:pt-200 lg:pb-60">
      <img src="/assets/landing/hero-pattern.png" alt="" className="absolute top-0 right-0 h-full" />
      <div className="relative flex-col lg:flex-row items-center w-full max-w-600 lg:max-w-1520  mx-auto flex gap-60 xl:gap-24">
        <div className="w-full flex flex-col gap-32 lg:gap-12">
          <ScrollAnimationElement initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} duration={0.8}>
            <div className="text-52 w-fit g-button-text text-center lg:text-left uppercase font-semibold leading-[1.2]">
              Empower Your Business with Secure and Compliant Crypto Payments
            </div>
          </ScrollAnimationElement>

          <ScrollAnimationElement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            delay={0.4}
          >
            <p className="text-center lg:text-left text-16 leading-[1.5]">
              At Stratis Money Service, we bridge the gap between traditional finance and the digital world. Regulated
              by the Bank of Spain (SEPBLAC) with a VASP registration, we provide a secure platform that allows your
              customers to pay in crypto, ensuring compliance and eliminating uncertainty.
            </p>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.8}
            delay={0.8}
          >
            <div className="flex flex-col lg:gap-24 gap-8 mt-28 max-w-480 mx-auto lg:mx-0 lg:max-w-none">
              {featurePoints.map((item, i) => (
                <div key={i} className="flex items-start gap-12">
                  <IconBox icon="ph:check-circle" borderColor="border-[#374F64]" backColor="bg-[#062A42]" />
                  <div className="flex flex-col gap-6">
                    <div className="font-semibold text-24">{item.key}</div>
                    <div className="text-16 text-[#788F99]">{item.text}</div>
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
