"use client";
import Link from "next/link";
import React, { PropsWithChildren, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import useAppSelector from "@/hooks/global/useAppSelector";
import { logout } from "@/store/slices/auth.slice";
import { apiLogout } from "@/api/auth.api";

import { ROLES } from "@/@types/common";
import { dictionaryApp, dictionaryGlobal } from "@/config/dictionary";
import { setLocale } from "@/store/slices/locale.slice";
import { LOCALES } from "@/config/constants";

const AppSidebar: React.FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [isWrapped, setIsWrapped] = useState(true);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const pathname = usePathname();
  const { name, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      toast.success(dictionaryApp.appSidebar.toastMessages.logoutSuccess[locale]);
    } catch (error) {}
    dispatch(logout());
    setLoading(false);
  };
  return (
    <main id="mainSection" className="w-full min-h-[100vh] flex gap-4 bg-primary-800 overflow-auto">
      <aside
        className={`h-full p-8 flex-none text-secondary-100 fixed z-40 block top-0 transition-all duration-300 ${
          isOpenMobileMenu ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        <div
          className={`relative bg-primary-900 flex flex-col h-full rounded-8 shadow-md p-8 transition-all duration-300  ${
            isWrapped ? "w-240" : "w-64"
          }`}
        >
          <Link
            href={"/"}
            className={`p-6 flex text-24 font-semibold items-center justify-start overflow-hidden gap-12`}
          >
            <SvgLogoApp className={"w-36 h-36 flex-none"} />
            <div className={`${isWrapped ? "block" : "hidden"}`}>Stratis</div>
          </Link>

          <div className="mt-36 flex flex-col gap-8 text-14">
            {role !== ROLES.COMPLIANCE && (
              <Link
                href="/app/order"
                className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                  pathname.includes("/app/order") ? "bg-primary-700" : "hover:bg-primary-700/40"
                }`}
                onClick={() => {
                  setIsOpenMobileMenu(false);
                }}
              >
                <Icon icon="material-symbols-light:document-scanner-outline-rounded" className="w-30 h-30 flex-none" />
                <div className={` ${isWrapped ? "block" : "hidden"}`}>
                  {dictionaryApp.appSidebar.menu.order[locale]}
                </div>
              </Link>
            )}
            {role !== ROLES.COMPLIANCE && role !== ROLES.AGENT && (
              <Link
                href="/app/withdraw"
                className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                  pathname.includes("/app/withdraw") ? "bg-primary-700" : "hover:bg-primary-700/40"
                }`}
                onClick={() => {
                  setIsOpenMobileMenu(false);
                }}
              >
                <Icon icon="ph:hand-withdraw-thin" className="w-30 h-30 flex-none" />
                <div className={` ${isWrapped ? "block" : "hidden"}`}>
                  {dictionaryApp.appSidebar.menu.withdraw[locale]}
                </div>
              </Link>
            )}
            {role === ROLES.BUSINESS && (
              <Link
                href="/app/agent"
                className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                  pathname.includes("/app/agent") ? "bg-primary-700" : "hover:bg-primary-700/40"
                }`}
                onClick={() => {
                  setIsOpenMobileMenu(false);
                }}
              >
                <Icon icon="material-symbols-light:real-estate-agent-outline-rounded" className="w-30 h-30 flex-none" />
                <div className={` ${isWrapped ? "block" : "hidden"}`}>
                  {dictionaryApp.appSidebar.menu.agent[locale]}
                </div>
              </Link>
            )}
            {(role === ROLES.ADMIN || role === ROLES.COMPLIANCE) && (
              <Link
                href="/app/user"
                className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                  pathname.includes("/app/user") ? "bg-primary-700" : "hover:bg-primary-700/40"
                }`}
                onClick={() => {
                  setIsOpenMobileMenu(false);
                }}
              >
                <Icon icon="material-symbols-light:business-center-outline-rounded" className="w-30 h-30 flex-none" />
                <div className={` ${isWrapped ? "block" : "hidden"}`}>
                  {dictionaryApp.appSidebar.menu.companies[locale]}
                </div>
              </Link>
            )}
            {role !== ROLES.COMPLIANCE && role !== ROLES.AGENT && (
              <Link
                href="/app/custody"
                className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                  pathname.includes("/app/custody") ? "bg-primary-700" : "hover:bg-primary-700/40"
                }`}
                onClick={() => {
                  setIsOpenMobileMenu(false);
                }}
              >
                <Icon icon="material-symbols-light:account-balance-wallet-outline" className="w-30 h-30 flex-none" />
                <div className={` ${isWrapped ? "block" : "hidden"}`}>
                  {dictionaryApp.appSidebar.menu.custody[locale]}
                </div>
              </Link>
            )}
            <Link
              href="/app/account"
              className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/account") ? "bg-primary-700" : "hover:bg-primary-700/40"
              }`}
              onClick={() => {
                setIsOpenMobileMenu(false);
              }}
            >
              <Icon icon="material-symbols-light:manage-accounts-outline" className="w-30 h-30 flex-none" />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>
                {dictionaryApp.appSidebar.menu.profile[locale]}
              </div>
            </Link>
            <Link
              href="/app/security/2fa"
              className={`p-9 flex items-center justify-start gap-12  u-transition-color rounded-8 overflow-hidden ${
                pathname.includes("/app/security/2fa") ? "bg-primary-700" : "hover:bg-primary-700/40"
              }`}
              onClick={() => {
                setIsOpenMobileMenu(false);
              }}
            >
              <Icon icon="material-symbols-light:shield-lock-outline-rounded" className="w-30 h-30 flex-none" />
              <div className={` ${isWrapped ? "block" : "hidden"}`}>2FA</div>
            </Link>
          </div>

          <div className="mt-auto flex flex-col gap-12">
            <Link
              href="/app/account"
              className={`p-9 flex items-center justify-start gap-6  u-transition-color  rounded-8 overflow-hidden ${
                pathname.includes("/app/account") ? "bg-primary-700" : "bg-primary-700/30"
              }`}
              onClick={() => {
                setIsOpenMobileMenu(false);
              }}
            >
              <img src="/assets/global/avatar.png" alt="avatar" className=" w-30 h-30 flex-none rounded-full" />

              <div className={`text-14 u-text-overflow ${isWrapped ? "block" : "hidden"}`}>{name}</div>
              <div
                className={`text-10  border border-secondary-400 text-secondary-400 rounded-4 px-4 py-2 ml-auto ${
                  isWrapped ? "block" : "hidden"
                }`}
              >
                {dictionaryGlobal.roles[locale][role]}
              </div>
            </Link>
            <div
              className={`flex items-center w-full overflow-hidden px-8 ${
                isWrapped ? "justify-end" : "justify-center"
              }`}
            >
              {role !== ROLES.ADMIN && role !== ROLES.COMPLIANCE && isWrapped && (
                <div className="text-14 flex items-center text-input-text mr-auto">
                  {LOCALES.map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        {i !== 0 && <hr className="rotate-90 w-16" />}
                        <div
                          key={item.code}
                          className={`cursor-pointer ${
                            locale === item.code ? "text-secondary-400" : "hover:text-white"
                          }`}
                          onClick={() => {
                            dispatch(setLocale(item.code));
                            setIsOpenMobileMenu(false);
                          }}
                        >
                          {item.code}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
              <div
                onClick={handleLogout}
                className={`cursor-pointer p-4 rounded-6 hover:bg-primary-700/30 u-transition-color flex items-center `}
              >
                <Icon icon={"material-symbols:logout"} className="w-20 h-20" />
              </div>
            </div>
          </div>

          <div
            onClick={() => setIsWrapped(!isWrapped)}
            className={`hidden lg:block bg-primary-900 rounded-full absolute  p-3 cursor-pointer top-64 -right-4 hover:bg-primary-700 u-transition-color `}
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
      <header className=" text-secondary-200  fixed top-0 left-0 w-full z-20 lg:hidden">
        <div
          className={`relative bg-primary-900 flex justify-between items-center h-full shadow-md p-8 transition-all duration-300`}
        >
          <Link href={"/"}>
            <SvgLogoApp className={"w-36 h-36 "} />
          </Link>
          <div
            className="p-6 cursor-pointer rounded-4 hover:bg-primary-700/30"
            onClick={() => {
              setIsOpenMobileMenu(true);
            }}
          >
            <Icon icon="ic:round-menu" className="w-28 h-28 text-secondary-200 " />
          </div>
        </div>
      </header>
      <section
        className={`p-8 w-full transition-all duration-300 bg-primary-800 pt-65 lg:pt-0 min-h-[100vh] ${
          isWrapped ? "lg:pl-256" : "lg:pl-80"
        }`}
      >
        {children}
      </section>
    </main>
  );
};

export default AppSidebar;
