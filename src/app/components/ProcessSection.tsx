"use client";
import React from "react";

import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import IconBox from "@/components/global/IconBox";

const processSteps = [
  {
    icon: "iconoir:square-cursor",
    key: "Register your Business",
    text: "Sign up and create your business account with us in just a few minutes",
  },
  {
    icon: "solar:check-circle-outline",
    key: "Verify your Business",
    text: "Complete the Know your Business verification to ensure compliance with regulations.",
  },
  {
    icon: "iconoir:link",
    key: "Generate Payment Link",
    text: "Create a payment link through our platform, we will share it with your customer.",
  },
  {
    icon: "hugeicons:dollar-receive-01",
    key: "Receive Payment & Transfer Funds",
    text: "Once your customer pays, funds are instantly liquidated and ready to be withdrawn to your business bank account",
  },
];

const ProcessSection = () => {
  return (
    <section className="px-16 py-80 lg:py-120 relative">
      <div className="relative items-center w-full  max-w-600 lg:max-w-1440 mx-auto flex gap-80 flex-col lg:flex-row-reverse">
        <div className="w-full relative p-12">
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: -40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.8}
          >
            <img src="/assets/landing/process-bg.png" alt="" className="w-full" />
          </ScrollAnimationElement>
        </div>
        <div className="w-full flex flex-col gap-12">
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
          >
            <div className="text-52 w-fit g-button-text text-center lg:text-left uppercase font-semibold leading-[1.2]">
              How our platform works
            </div>
          </ScrollAnimationElement>
          <ScrollAnimationElement
            initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            duration={0.5}
            delay={0.3}
          >
            <p className="text-gray-400">
              Start accepting crypto payments in just a few simple steps. Our streamlined process ensures your business
              is up and running quickly, with no hassle and full regulatory compliance.
            </p>
          </ScrollAnimationElement>

          <div className="flex flex-col gap-24 mt-32">
            {processSteps.map((item, i) => (
              <ScrollAnimationElement
                key={i}
                initial={{ opacity: 0, filter: "blur(12px)", x: 40 }}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                duration={0.5}
                delay={0.3 + i * 0.2}
              >
                <div className="flex flex-col lg:gap-24 gap-8 max-w-480 mx-auto lg:mx-0 lg:max-w-none">
                  <div key={i} className="flex items-start gap-12">
                    <IconBox icon={item.icon} borderColor="border-[#374F64]" backColor="bg-[#062A42]" />
                    <div className="flex flex-col gap-6">
                      <div className="font-semibold text-24">{item.key}</div>
                      <div className="text-16 text-[#788F99]">{item.text}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
