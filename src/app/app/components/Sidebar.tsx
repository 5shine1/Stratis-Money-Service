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
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <aside
        className={`h-full p-8 flex-none dark:text-secondary-200 text-primary-500 absolute lg:relative z-30 block top-0 transition-all duration-300 ${
          isOpenMobileMenu ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        <div
          className={`relative dark:bg-primary-900 bg-secondary-100 flex flex-col h-full rounded-8 shadow-md p-8 transition-all duration-300  ${
            isWrapped ? "w-240" : "w-64"
          }`}
        >
          <Link
            href={"/"}
            className={`flex text-24 font-bold items-center justify-start overflow-hidden gap-12`}
          >
            <SvgLogoApp className="w-48 h-48 flex-none !fill-primary-500 dark:!fill-secondary-200" />
            <div className={`${isWrapped ? "block" : "hidden"}`}>STRATIS</div>
          </Link>

          <div className="mt-36 flex flex-col gap-8">
            <Link
              href="/app/payment"
              className={`p-6 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/payment")
                  ? "bg-secondary-400 dark:bg-primary-700"
                  : "hover:bg-white/30 dark:hover:bg-primary-700/40"
              }`}
            >
              <Icon
                icon="fluent:payment-20-regular"
                className="w-36 h-36 flex-none"
              />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>
                Payment
              </div>
            </Link>
            <Link
              href="/app/order"
              className={`p-6 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/order")
                  ? "bg-secondary-400 dark:bg-primary-700"
                  : "hover:bg-white/30 dark:hover:bg-primary-700/40"
              }`}
            >
              <Icon
                icon="solar:round-transfer-diagonal-outline"
                className="w-36 h-36 flex-none"
              />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>Order</div>
            </Link>
          </div>

          <div className="mt-auto flex flex-col gap-12">
            {/* <div className="text-12 flex items-center justify-between overflow-hidden">
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
          </div> */}
            <Link
              href="/app/profile"
              className={`p-6 flex items-center justify-start gap-12  u-transition-color hover:bg-white/20 hover:dark:bg-primary-700/30 rounded-8 overflow-hidden ${
                pathname.includes("/app/profile")
                  ? "bg-primary-700 dark:bg-secondary-400"
                  : ""
              }`}
            >
              <img
                src="https://avatars.githubusercontent.com/u/162055292?v=4"
                alt="avatar"
                className=" w-36 h-36 flex-none rounded-full"
              />
              <div
                className={`text-14 u-text-overflow ${
                  isWrapped ? "block" : "hidden"
                }`}
              >
                Harry Donato Name Here
              </div>
              <div className="text-10 text-white dark:text-black bg-primary-500 dark:bg-secondary-400 rounded-4 px-4 py-2 ml-auto">
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
                className={`cursor-pointer p-4 rounded-6 hover:bg-white/20 dark:hover:bg-primary-700/30 u-transition-color ${
                  isWrapped ? "block" : "hidden"
                }`}
              >
                <Icon icon={"material-symbols:logout"} className="w-20 h-20" />
              </div>
            </div>
          </div>

          <div
            onClick={() => setIsWrapped(!isWrapped)}
            className={`hidden lg:block bg-secondary-100 dark:bg-primary-900 rounded-full absolute  p-3 cursor-pointer top-64 -right-4 hover:bg-secondary-200 dark:hover:bg-primary-700 u-transition-color `}
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
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md z-20 lg:hidden transition-all duration-200 ${
          isOpenMobileMenu
            ? "opacity-100 pointer-event-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setIsOpenMobileMenu(false);
        }}
      ></div>
      <header className=" dark:text-secondary-200 text-primary-500 fixed top-0 left-0 w-full z-10 lg:hidden">
        <div
          className={`relative dark:bg-primary-900 bg-secondary-100 flex justify-between items-center h-full shadow-md p-8 transition-all duration-300`}
        >
          <Link href={"/"}>
            <SvgLogoApp className="w-48 h-48 flex-none !fill-primary-500 dark:!fill-secondary-200" />
          </Link>
          <div
            className="p-6 cursor-pointer rounded-4 hover:bg-white/20 dark:hover:bg-primary-700/30"
            onClick={() => {
              setIsOpenMobileMenu(true);
            }}
          >
            <Icon
              icon="ic:round-menu"
              className="w-28 h-28 dark:text-secondary-200 text-primary-500"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default AppSidebar;
