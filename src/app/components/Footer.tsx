"use client";
import React from "react";
import Link from "next/link";
import SvgLogoApp from "@/assets/SvgLogoApp";

const Footer = () => {
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
            Terms & Conditions
          </Link>
          <Link className=" hover:text-secondary-200 u-transition-color" href={"#"}>
            Privacy Policy
          </Link>
        </div>
        <div className="w-full text-center lg:text-right text-[#6B7A87]">©2024 All right reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
