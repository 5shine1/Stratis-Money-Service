"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import { optimizedBalance } from "@/utils/number.utils";

import SwitchDarkmode from "./SwitchDarkmode";

const AppSidebar = () => {
  const [isWrapped, setIsWrapped] = useState(true);
  const pathname = usePathname();
  return (
    <aside className="h-full p-8 flex-none text-primary-600">
      <div
        className={`relative bg-secondary-200 flex flex-col h-full rounded-8 shadow-md p-8 transition-all duration-300  ${
          isWrapped ? "w-240" : "w-64"
        }`}
      >
        <Link
          href={"/"}
          className={`flex text-24 font-bold items-center justify-start overflow-hidden gap-12`}
        >
          <SvgLogoApp className="w-48 h-48 flex-none" />
          <div className={`${isWrapped ? "block" : "hidden"}`}>STRATIS</div>
        </Link>

        <div className="mt-36 flex flex-col gap-8">
          <Link
            href="/app/payment"
            className={`p-6 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
              pathname.includes("/app/payment")
                ? "bg-secondary-400"
                : "hover:bg-white/30"
            }`}
          >
            <Icon
              icon="fluent:payment-20-regular"
              className="w-36 h-36 flex-none"
            />
            <div className={`${isWrapped ? "block" : "hidden"}`}>Payment</div>
          </Link>
          <Link
            href="/app/order"
            className={`p-6 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
              pathname.includes("/app/order")
                ? "bg-secondary-400"
                : "hover:bg-white/30"
            }`}
          >
            <Icon
              icon="solar:round-transfer-diagonal-outline"
              className="w-36 h-36 flex-none"
            />
            <div className={`${isWrapped ? "block" : "hidden"}`}>Order</div>
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-12">
          <div className="text-12 flex items-center justify-between overflow-hidden">
            <span
              className={` whitespace-nowrap ${isWrapped ? "block" : "hidden"}`}
            >
              Your Balance:
            </span>
            <span className="whitespace-nowrap">
              $
              {isWrapped
                ? (123456789.1234).toLocaleString()
                : optimizedBalance(123456789.1234)}
            </span>
          </div>
          <Link
            href="/app/profile"
            className={`p-6 flex items-center justify-start gap-12  u-transition-color bg-white/30 rounded-8 overflow-hidden ${
              pathname.includes("/app/profile") ? "bg-secondary-400" : ""
            }`}
          >
            <img
              src="https://avatars.githubusercontent.com/u/162055292?v=4"
              alt="avatar"
              className=" w-36 h-36 flex-none border-2 border-primary-700 rounded-full"
            />
            <div
              className={`text-14 u-text-overflow ${
                isWrapped ? "block" : "hidden"
              }`}
            >
              Harry DonatoHarrydo
            </div>
            <div className="text-10 text-gray-200 bg-primary-700 rounded-4 px-4 py-2 ml-auto">
              Customer
            </div>
          </Link>
          <div
            className={`flex items-center w-full overflow-hidden ${
              isWrapped ? "justify-between" : "justify-center"
            }`}
          >
            <SwitchDarkmode isWrapped={isWrapped} />
            <div
              className={`cursor-pointer p-4 rounded-6 hover:bg-white/20 u-transition-color ${
                isWrapped ? "block" : "hidden"
              }`}
            >
              <Icon icon={"material-symbols:logout"} className="w-20 h-20" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsWrapped(!isWrapped)}
          className={`bg-secondary-200 rounded-full absolute  p-3 cursor-pointer top-64 -right-4 hover:bg-secondary-400 u-transition-color `}
        >
          <Icon
            icon="icon-park-outline:right"
            className={`${
              isWrapped ? "rotate-180" : "rotate-0"
            } w-16 h-16 transition-all duration-300`}
          />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
