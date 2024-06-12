"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";

import SwitchDarkmode from "./SwitchDarkmode";

const AppSidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const [isWrapped, setIsWrapped] = useState(true);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  return (
    <main id="mainSection" className="w-full h-[100vh] flex gap-4 bg-white dark:bg-primary-800 overflow-auto">
      <aside
        className={`h-full p-8 flex-none dark:text-secondary-100 text-primary-500 fixed z-40 block top-0 transition-all duration-300 ${
          isOpenMobileMenu ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        <div
          className={`relative dark:bg-primary-900 bg-secondary-100 flex flex-col h-full rounded-8 shadow-md p-8 transition-all duration-300  ${
            isWrapped ? "w-240" : "w-64"
          }`}
        >
          <Link href={"/"} className={`flex text-24 font-bold items-center justify-start overflow-hidden gap-12`}>
            <SvgLogoApp className="w-48 h-48 flex-none !fill-primary-500 dark:!fill-secondary-100" />
            <div className={`${isWrapped ? "block" : "hidden"}`}>STRATIS</div>
          </Link>

          <div className="mt-36 flex flex-col gap-8 text-14">
            <Link
              href="/app/order"
              className={`p-10 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/order")
                  ? "bg-secondary-400/80 dark:bg-primary-700"
                  : "hover:bg-white/30 dark:hover:bg-primary-700/40"
              }`}
            >
              <Icon icon="lets-icons:order-light" className="w-30 h-30 flex-none" />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>Order</div>
            </Link>
            <Link
              href="/app/withdraw"
              className={`p-10 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/withdraw")
                  ? "bg-secondary-400/80 dark:bg-primary-700"
                  : "hover:bg-white/30 dark:hover:bg-primary-700/40"
              }`}
            >
              <Icon icon="ph:hand-withdraw-thin" className="w-30 h-30 flex-none" />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>Withdraw</div>
            </Link>
            <Link
              href="/app/user"
              className={`p-10 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/user")
                  ? "bg-secondary-400/80 dark:bg-primary-700"
                  : "hover:bg-white/30 dark:hover:bg-primary-700/40"
              }`}
            >
              <Icon icon="ph:user-list-thin" className="w-30 h-30 flex-none" />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>User</div>
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
              href="/app/account"
              className={`p-6 flex items-center justify-start gap-6  u-transition-color  rounded-8 overflow-hidden ${
                pathname.includes("/app/account")
                  ? "dark:bg-primary-700 bg-secondary-400"
                  : "hover:bg-white/20 hover:dark:bg-primary-700/30"
              }`}
            >
              <img
                src="https://avatars.githubusercontent.com/u/162055292?v=4"
                alt="avatar"
                className=" w-36 h-36 flex-none rounded-full"
              />
              <div className={`text-14 u-text-overflow ${isWrapped ? "block" : "hidden"}`}>Harry Donato Name Here</div>
              <div className="text-10  border border-primary-500 text-primary-500 dark:border-secondary-400 dark:text-secondary-400 rounded-4 px-4 py-2 ml-auto">
                Customer
              </div>
            </Link>
            <div
              className={`flex items-center w-full overflow-hidden ${isWrapped ? "justify-between" : "justify-center"}`}
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
            className={`hidden lg:block bg-secondary-100 dark:bg-primary-900 rounded-full absolute  p-3 cursor-pointer top-64 -right-4 hover:bg-secondary-400 dark:hover:bg-primary-700 u-transition-color `}
          >
            <Icon
              icon="icon-park-outline:right"
              className={`${isWrapped ? "rotate-180" : "rotate-0"} w-16 h-16 transition-all duration-300`}
            />
          </div>
        </div>
      </aside>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md z-30 lg:hidden transition-all duration-200 ${
          isOpenMobileMenu ? "opacity-100 pointer-event-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setIsOpenMobileMenu(false);
        }}
      ></div>
      <header className=" dark:text-secondary-200 text-primary-500 fixed top-0 left-0 w-full z-20 lg:hidden">
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
            <Icon icon="ic:round-menu" className="w-28 h-28 dark:text-secondary-200 text-primary-500" />
          </div>
        </div>
      </header>
      <section
        className={`p-8 w-full transition-all duration-300 min-h-screen bg-secondary-100/20 dark:bg-primary-800 overflow-auto pt-65 lg:pt-0 ${
          isWrapped ? "lg:pl-256" : "lg:pl-80"
        }`}
      >
        {children}
      </section>
    </main>
  );
};

export default AppSidebar;
