"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import { APP_ROUTES } from "@/config/constants";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useClickOutside from "@/hooks/global/useClickOutside";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { logout } from "@/store/slices/auth.slice";
import { apiLogout } from "@/api/auth.api";
import { formattedUsername } from "@/utils/string.utils";
import SvgLogoApp from "@/assets/SvgLogoApp";
import IconBox from "@/components/global/IconBox";
import { dictionaryLanding } from "@/config/dictionary";
import { setLocale } from "@/store/slices/locale.slice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { setLoading } = useContext(LoadingContext);
  const { email } = useAppSelector((state) => state.auth);
  const [openMobile, setOpenMobile] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { locale } = useAppSelector((state) => state.locale);
  const [openLocale, setOpenLocale] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      toast.success(dictionaryLanding.logoutSuccess[locale]);
    } catch (error) {}
    dispatch(logout());
    setLoading(false);
  };

  return (
    <>
      <header
        className={`bg-gradient-to-r from-button-from/10 to-button-to/10 z-10 absolute top-0  left-0 w-full px-16 py-16 md:py-24 backdrop-blur-md`}
      >
        <nav className="flex items-center gap-8 md:gap-32 max-w-1520 mx-auto">
          <Link href={"/"} className="mr-auto flex gap-10 items-center">
            <SvgLogoApp className={"w-36 h-36 "} />
            <span className=" text-20 md:text-24 lg:text-32 font-semibold g-header">Stratis Money Service</span>
          </Link>
          <ul className="text-[#BDCCD8] text-16 items-center gap-40 hidden lg:flex">
            {APP_ROUTES.map((item) => (
              <Link className=" hover:text-secondary-200 u-transition-color" href={item.path} key={item.key}>
                {item.text[locale]}
              </Link>
            ))}
          </ul>
          <div
            className={`relative hidden lg:flex `}
            ref={useClickOutside(() => {
              setOpenLocale(false);
            })}
          >
            <div
              className=" flex items-center gap-6 cursor-pointer"
              onClick={() => {
                setOpenLocale(!openLocale);
              }}
            >
              {locale}
              <Icon
                icon="mingcute:down-line"
                className={`w-20 h-20 duration-200 transition-all ${openLocale ? "rotate-180" : "rotate-0"}`}
              />
            </div>
            <div
              className={`absolute right-0 transition-all duration-200 flex flex-col bg-gradient-to-r from-button-from/10 to-button-to/10 backdrop-blur-md rounded-12 border border-[#95845C] ${
                openLocale ? "opacity-100 pointer-events-auto top-36" : "opacity-0 pointer-events-none top-64"
              }`}
            >
              <button
                onClick={() => {
                  dispatch(setLocale("EN"));
                  setOpenLocale(false);
                }}
                className="text-16 p-12 text-left border-b border-[#95845C]"
              >
                English
              </button>
              <button
                onClick={() => {
                  dispatch(setLocale("ES"));
                  setOpenLocale(false);
                }}
                className="text-16 p-12 text-left"
              >
                Española
              </button>
            </div>
          </div>

          <div
            className={`relative  ${email ? "hidden lg:block" : "hidden"}`}
            ref={useClickOutside(() => {
              setOpenUserMenu(false);
            })}
          >
            <div
              className=" flex items-center gap-6 cursor-pointer"
              onClick={() => {
                setOpenUserMenu(!openUserMenu);
              }}
            >
              {formattedUsername(email)}
              <Icon
                icon="mingcute:down-line"
                className={`w-20 h-20 duration-200 transition-all ${openUserMenu ? "rotate-180" : "rotate-0"}`}
              />
            </div>
            <div
              className={`absolute right-0 transition-all duration-200 flex flex-col bg-gradient-to-r from-button-from/10 to-button-to/10 backdrop-blur-md rounded-12 border border-[#95845C] ${
                openUserMenu ? "opacity-100 pointer-events-auto top-36" : "opacity-0 pointer-events-none top-64"
              }`}
            >
              <Link
                href={"/app/account"}
                className="flex items-center gap-8 u-transition-color cursor-pointer px-16 py-12 rounded-4 whitespace-nowrap border-b border-[#95845C] text-white"
              >
                <Icon icon="ph:user" className="w-20 h-20 flex-none" />
                {dictionaryLanding.account[locale]}
              </Link>
              <div
                className="flex items-center gap-8 font-medium u-transition-color cursor-pointer px-16 py-12 rounded-4 text-[#FF2F2F] whitespace-nowrap"
                onClick={handleLogout}
              >
                <Icon icon="material-symbols:logout" className="w-20 h-20 flex-none" />
                {dictionaryLanding.logout[locale]}
              </div>
            </div>
          </div>
          <Link href={"/auth/login"} className={`${email ? "hidden" : "hidden lg:block"}`}>
            <button className=" text-button-text text-16 font-semibold py-12 px-36  rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50">
              {dictionaryLanding.signin[locale]}
            </button>
          </Link>

          <div className="cursor-pointer lg:hidden" onClick={() => setOpenMobile(true)}>
            <IconBox icon="gg:menu" />
          </div>
        </nav>
      </header>
      {openMobile && <div className="fixed z-10 top-0 left-0 w-full h-full" onClick={() => setOpenMobile(false)}></div>}
      <div
        className={`fixed top-0 w-240 h-full g-box-back z-20 backdrop-blur-lg transition-all duration-300 flex flex-col pt-96 pb-36 justify-start items-end p-16 lg:hidden ${
          openMobile ? "opacity-100 right-0" : "opacity-0 -right-full"
        }`}
      >
        <div className="cursor-pointer absolute right-16 top-16" onClick={() => setOpenMobile(false)}>
          <IconBox icon="gg:close" />
        </div>
        <ul className="flex flex-col  gap-32 text-16 items-end w-full">
          {APP_ROUTES.map((item) => (
            <Link className=" hover:text-secondary-200 u-transition-color" href={item.path} key={item.key}>
              {item.text[locale]}
            </Link>
          ))}
          <Link href={"/auth/login"} className={`w-full ${email ? "hidden" : "block"}`}>
            <button className="w-full text-button-text text-16 font-semibold py-12 px-36  rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50">
              {dictionaryLanding.signin[locale]}
            </button>
          </Link>
          <div className="flex items-center gap-4">
            <button
              className={`${locale === "EN" ? "text-secondary-200" : "hover:text-white"}`}
              onClick={() => dispatch(setLocale("EN"))}
            >
              English
            </button>
            <hr className="rotate-90 w-16" />
            <button
              className={`${locale === "ES" ? "text-secondary-200" : "hover:text-white"}`}
              onClick={() => dispatch(setLocale("ES"))}
            >
              Española
            </button>
          </div>
        </ul>
        {email && (
          <div className="mt-auto flex flex-col gap-24 items-end">
            <Link
              href={"/app/account"}
              className="flex items-center gap-8 u-transition-color cursor-pointer rounded-4 whitespace-nowrap"
            >
              <Icon icon="ph:user" className="w-20 h-20 flex-none" />
              {dictionaryLanding.account[locale]}
            </Link>
            <div
              className="flex items-center gap-8 font-medium u-transition-color cursor-pointer rounded-4 text-[#FF2F2F]"
              onClick={handleLogout}
            >
              <Icon icon="material-symbols:logout" className="w-20 h-20" />
              {dictionaryLanding.logout[locale]}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
