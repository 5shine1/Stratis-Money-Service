"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { APP_ROUTES, SOCIAL_LINKS } from "@/config/constants";

const Footer = () => {
  return (
    <footer className="w-full relative">
      <div className="g-effect absolute -top-[500px] -z-10 left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] pointer-event-none scale-50 lg:scale-100"></div>

      <div className="relative px-16 py-24 pb-16 border-b border-white/5">
        <div className="items-center flex-col lg:flex-row flex gap-24 justify-between max-w-1440 mx-auto w-full">
          <div className="text-32 font-bold">Stratis Money Service</div>
          <div className="flex gap-24 items-center">
            {SOCIAL_LINKS.map((item) => (
              <Link key={item.id} href={item.link}>
                <Icon
                  icon={item.icon}
                  className="w-20 h-20 text-gray-400 cursor-pointer hover:text-primary-300 u-transition-color"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center gap-48 py-40">
        {APP_ROUTES.map((item) => (
          <Link className=" hover:text-secondary-200 u-transition-color" href={item.path} key={item.key}>
            {item.text}
          </Link>
        ))}
      </div>
      <div className="relative border-t border-white/5 px-10 py-24">
        <div className="w-full text-center mx-auto max-w-1440  text-gray-400 text-12">
          Copyright © 2024 Stratis Group Ltd. All Right Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
