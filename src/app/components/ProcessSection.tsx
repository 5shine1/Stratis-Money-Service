"use client";
import React from "react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";

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
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
          >
            <h2 className="uppercase text-center lg:text-left">How our platform works</h2>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
            delay={0.3}
          >
            <p className="text-gray-400">
              Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of
              English to emphasise design elements over content. It&apos; s also called placeholder (or filler) text.
            </p>
          </ScrollAnimationElement>

          <div className="flex flex-col gap-36">
            {mockData.map((item, i) => (
              <ScrollAnimationElement
                key={i}
                initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                duration={0.5}
                delay={0.3 + i * 0.2}
              >
                <div className="flex items-center gap-16">
                  <div className="rounded-full flex-none w-64 h-64 bg-gradient-to-b from-primary-400 to-secondary-300"></div>
                  <div className="flex flex-col gap-4">
                    <p className="g-button-text text-24 font-semibold w-fit">{item.key}</p>
                    <p className=" text-gray-400">
                      Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place
                      of English to emphasise design elements over content.
                    </p>
                  </div>
                </div>
              </ScrollAnimationElement>
            ))}
          </div>
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            duration={0.5}
            delay={1.2}
          >
            <div className="w-full flex items-center lg:justify-start justify-center">
              <AnimatedSlideButton className="text-20 lg:text-24 border border-secondary-300 rounded-full px-32 py-12 lg:px-40 lg:py-16 mt-24">
                Learn More
              </AnimatedSlideButton>
            </div>
          </ScrollAnimationElement>
        </div>
        <div className="w-full relative p-12">
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: -40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.8}
          >
            <img src="/assets/landing/hero-bg.png" alt="" className="absolute w-full" />
            <img src="/assets/landing/hero.png" alt="" className="relative max-w-full" />
          </ScrollAnimationElement>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
