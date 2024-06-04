"use client";

import React from "react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import ScrollAnimationElement from "@/components/global/ScrollAnimatedElement";
import Link from "next/link";

const ConclusionSection = () => {
  return (
    <section className="lg:pt-120 pt-60 px-16 mb-3">
      <div className="w-full max-w-1440 mx-auto relative">
        <ScrollAnimationElement
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.5 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          duration={0.5}
        >
          <div className="w-full h-450 overflow-hidden rounded-24">
            <img src="/assets/landing/conclusion.png" alt="" className="w-full h-full object-cover" />
          </div>
        </ScrollAnimationElement>
        <ScrollAnimationElement
          initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          duration={0.5}
        >
          <div className="z-10 ml-0 lg:ml-70 -translate-y-1/2 py-24 lg:py-48 px-36 lg:px-56 bg-gradient-to-b from-primary-200/90 to-primary-500/90 rounded-32 max-w-600 w-full">
            <h2 className="g-title w-fit">Get Started Now</h2>
            <div className="text-gray-400 mt-16">
              Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place ...
            </div>
            <Link href={"/auth/register"}>
              <AnimatedSlideButton className=" text-18 lg:text-24 py-12 px-28 lg:px-36 border border-secondary-300 rounded-full mt-36">
                Sign Up Now
              </AnimatedSlideButton>
            </Link>
          </div>
        </ScrollAnimationElement>
      </div>
    </section>
  );
};

export default ConclusionSection;
