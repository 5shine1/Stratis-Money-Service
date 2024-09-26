"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";

const featurePoints = [
  { title: "Regulatory Compliance", text: "Trust in a solution regulated by the Bank of Spain." },
  { title: "Hassle-Free Integration", text: "No complex setup required, start accepting crypto payments instantly" },
  { title: "Rapid Settlement", text: "Crypto-assets are immediately liquidated, removing risk of volatility" },
];

const FeatureSection = () => {
  return (
    <section className="px-16 py-80 lg:py-120 relative">
      <div className="relative w-full  max-w-600 lg:max-w-1520 mx-auto flex items-center gap-24 justify-between">
        <div className="w-full max-w-600">
          <ScrollAnimationElement
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            duration={0.5}
          >
            <img
              src="/assets/global/mock.png"
              alt=""
              className="w-full aspect-[4/3] rounded-36 border border-[#374F64]"
            />
          </ScrollAnimationElement>
        </div>
        <div>
          <ScrollAnimationElement
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            duration={0.5}
          >
            <div className="text-52 w-fit g-button-text text-center lg:text-left uppercase font-semibold leading-[1.2]">
              Why Choose Us
            </div>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            duration={0.8}
            delay={0.4}
          >
            <div className="flex flex-col  gap-32 mt-56 lg:mt-60 ">
              {featurePoints.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-40 pb-24 border-b border-[#213541] last:border-transparent"
                >
                  <div className="text-[#1B2B35] font-extrabold text-48">0{i + 1}</div>
                  <div className="flex flex-col gap-6">
                    <div className="font-semibold text-24">{item.title}</div>
                    <div className="text-16 text-[#788F99]">{item.text}</div>
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
