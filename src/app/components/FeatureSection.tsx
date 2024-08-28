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
      <div className="g-effect absolute -top-[800px] -z-10 -right-[600px] w-[1200px] h-[1600px] scale-50 lg:scale-100"></div>
      <div className="relative w-full  max-w-600 lg:max-w-1440 mx-auto ">
        <ScrollAnimationElement initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} duration={0.5}>
          <h2 className="uppercase text-center">Why Choose Us</h2>
        </ScrollAnimationElement>        
        <div className="flex items-center lg:items-stretch justify-between flex-col lg:flex-row gap-32 mt-56 lg:mt-96">
          {featurePoints.map((item, i) => (
            <ScrollAnimationElement
              key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              duration={0.8}
              delay={0.4}
            >
              <div className="rounded-32 w-full bg-primary-600 border border-primary-400 p-12 max-w-400">
                <div className="overflow-hidden aspect-[4/3] rounded-24">
                  <img src="/assets/global/mock.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="py-24">
                  <h6 className="g-button-text w-fit font-semibold text-24 lg:text-32">{item.title}</h6>
                  <p className="text-gray-400 mt-12">
                    {item.text}
                  </p>
                </div>
              </div>
            </ScrollAnimationElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
