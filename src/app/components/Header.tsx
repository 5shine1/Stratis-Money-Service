"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

import SvgLogo from "@/assets/SvgLogo";
import { APP_ROUTES } from "@/config/constants";
import { ScrollContext } from "@/components/providers/ScrollProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const Header = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const { scroll } = useContext(ScrollContext);

  return (
    <>
      <header
        className={`z-10 fixed top-0  left-0 w-full px-16 transition-all duration-300 ${
          scroll > 0 ? "bg-black/30 backdrop-blur-lg py-16 shadow-md" : "py-32"
        }`}
      >
        <nav className="flex items-center gap-8 max-w-1440 mx-auto">
          <Link href={"/"} className="mr-auto flex gap-16 items-center">
            <SvgLogo className={"w-40 h-40"} />
            <span className="text-32 font-bold hidden md:inline">
              Stratis Payment
            </span>
          </Link>
          <ul className="items-center gap-48 hidden md:flex">
            {APP_ROUTES.map((item) => (
              <Link
                className=" hover:text-secondary-100 u-transition-color"
                href={item.path}
                key={item.key}
              >
                {item.text}
              </Link>
            ))}
          </ul>
          <AnimatedSlideButton className="border border-secondary-200 px-24 py-8 lg:text-18 lg:py-10 lg:px-32 ml-auto">
            Sign In
          </AnimatedSlideButton>
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setOpenMobile(true)}
          >
            <Icon
              icon="heroicons-outline:menu"
              className="w-24 h-24 text-secondary-100"
            />
          </div>
        </nav>
      </header>
      <div
        className={`fixed top-0 w-full h-full bg-primary-800/80 z-20 backdrop-blur-lg transition-all duration-300 flex flex-col justify-center items-center lg:hidden ${
          openMobile ? "opacity-100 left-0" : "opacity-0 left-full"
        }`}
      >
        <div
          className="cursor-pointer absolute right-32 top-32"
          onClick={() => setOpenMobile(false)}
        >
          <Icon
            icon="fontisto:close"
            className="w-24 h-24 text-secondary-100"
          />
        </div>

        <div className="g-button-text text-32 font-bold w-fit">
          Stratis Payment
        </div>
        <ul className="flex flex-col  gap-24 text-24 mt-42">
          {APP_ROUTES.map((item) => (
            <Link
              className=" hover:text-secondary-100 u-transition-color"
              href={item.path}
              key={item.key}
            >
              {item.text}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
