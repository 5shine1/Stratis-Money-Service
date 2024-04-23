import React from "react";
import Link from "next/link";

import { APP_ROUTES } from "@/config/constants";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between max-w-1440 mx-auto p-4 py-12">
      <Link href={"/"}>
        <span className="text-32 font-bold font-sora">Stratis Payment</span>
      </Link>
      <div className="flex items-center gap-32">
        {APP_ROUTES.map((item) => (
          <Link
            className="font-semibold hover:text-secondary-100 u-transition-color"
            href={item.path}
            key={item.key}
          >
            {item.text}
          </Link>
        ))}
      </div>
      <AnimatedSlideButton className="border border-secondary-200 px-24 py-8">
        Sign In
      </AnimatedSlideButton>
    </header>
  );
};

export default Header;
