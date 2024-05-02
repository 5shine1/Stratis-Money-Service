"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { SOCIAL_LINKS } from "@/config/constants";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const NotFoundPage = () => {
  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>
      <div className="text-primary-300/10 text-[32vw] lg:text-[24vw] font-bold absolute top-0 left-0 leading-none -translate-x-[10%] -translate-y-[25%] pointer-event-none">
        404
      </div>
      <div className="relative w-full max-w-1440 mx-auto min-h-[100vh] items-center flex flex-col-reverse lg:flex-row gap-56 justify-center  px-16 py-80">
        <div className="w-full flex flex-col gap-32 lg:gap-56">
          <div>
            <h2 className="g-text-title text-center">Page Not Found</h2>
            <p className=" text-14 lg:text-20 text-center text-gray-400 mt-8 lg:mt-16">
              Oops! We could not find the page you are looking for.
            </p>
          </div>
          <Link href={"/"} className="w-fit mx-auto">
            <AnimatedSlideButton className="text-16 lg:text-20 py-16 lg:py-20 px-56 lg:px-72 border border-secondary-300 rounded-full ">
              Go back Home
            </AnimatedSlideButton>
          </Link>
          <div className="flex gap-24 lg:gap-36 items-center justify-center">
            {SOCIAL_LINKS.map((item) => (
              <Link key={item.id} href={item.link}>
                <Icon
                  icon={item.icon}
                  className="w-24 h-24 lg:w-32 lg:h-32 text-gray-400 cursor-pointer hover:text-secondary-300 u-transition-color"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="aspect-square w-full max-w-400 mx-auto relative">
            <div className="absolute w-full top-10 aspect-square rounded-40 bg-primary-300/10 animate-spinSlow"></div>
            <div className="absolute w-[90%] -translate-x-1/2 left-1/2 aspect-square bottom-0 rounded-40 bg-gradient-to-tr from-secondary-100 to-secondary-300"></div>
            <img
              src="/assets/global/404.png"
              alt=""
              className="absolute bottom-0 w-full left-[10%]"
            />
          </div>
        </div>
      </div>
      <p className="w-full absolute bottom-0 left-0 p-24 text-gray-400 text-12 text-center lg:text-left ">
        Copyright © 2024 Stratis Group Ltd. All Right Reserved.
      </p>
    </main>
  );
};

export default NotFoundPage;
