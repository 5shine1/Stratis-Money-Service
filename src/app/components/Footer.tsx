"use client";
import React from "react";
import Link from "next/link";
import SvgLogoApp from "@/assets/SvgLogoApp";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryLanding } from "@/config/dictionary";

const Footer = () => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <footer className={`bg-gradient-to-r from-button-from/10 to-button-to/10 z-10 w-full px-16 py-24 backdrop-blur-md`}>
      <div className="flex items-center flex-col lg:flex-row gap-32 lg:gap-12 max-w-1520 mx-auto">
        <div className="w-full flex justify-center lg:justify-start">
          <Link href={"/"} className="flex gap-10 items-center">
            <SvgLogoApp className={"w-36 h-36 "} />
            <span className=" text-20 md:text-24 lg:text-32 font-semibold  g-header">Stratis Money Service</span>
          </Link>
        </div>
        <div className="flex items-center flex-col md:flex-row justify-center gap-24 lg:gap-40 w-full">
          <Link className=" hover:text-secondary-200 u-transition-color" href={"#"}>
            {dictionaryLanding.term[locale]}
          </Link>
          <Link className=" hover:text-secondary-200 u-transition-color" href={"#"}>
            {dictionaryLanding.privacy[locale]}
          </Link>
        </div>
        <div className="w-full text-center lg:text-right text-[#6B7A87]">{dictionaryLanding.copy[locale]}</div>
      </div>
    </footer>
  );
};

export default Footer;
