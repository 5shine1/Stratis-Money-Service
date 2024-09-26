"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import { APP_ROUTES } from "@/config/constants";
import { ScrollContext } from "@/components/providers/ScrollProvider";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useClickOutside from "@/hooks/global/useClickOutside";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { logout } from "@/store/slices/auth.slice";
import { apiLogout } from "@/api/auth.api";
import { formattedUsername } from "@/utils/string.utils";
import SvgLogoApp from "@/assets/SvgLogoApp";

const Header = () => {
  const { scroll } = useContext(ScrollContext);
  const dispatch = useAppDispatch();
  const { setLoading } = useContext(LoadingContext);
  const { email } = useAppSelector((state) => state.auth);
  const [openMobile, setOpenMobile] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      toast.success("Logout successfully");
    } catch (error) {}
    dispatch(logout());
    setLoading(false);
  };

  return (
    <>
      <header
        className={`bg-gradient-to-r from-button-from/10 to-button-to/10 z-10 absolute top-0  left-0 w-full px-16 py-24 backdrop-blur-md`}
      >
        <nav className="flex items-center gap-8 md:gap-64 max-w-1520 mx-auto">
          <Link href={"/"} className="mr-auto flex gap-10 items-center">
            <SvgLogoApp className={"w-36 h-36 "} />
            <span className=" text-24 lg:text-32 font-semibold hidden md:inline g-header">Stratis Money Service</span>
          </Link>
          <ul className="text-[#BDCCD8] text-16 items-center gap-40 hidden md:flex">
            {APP_ROUTES.map((item) => (
              <Link className=" hover:text-secondary-200 u-transition-color" href={item.path} key={item.key}>
                {item.text}
              </Link>
            ))}
          </ul>
          <div
            className={`relative  ${email ? "block" : "hidden"}`}
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
              className={`absolute right-0 transition-all duration-200 flex flex-col gap-4 bg-primary-600 shadow-lg p-6 rounded-8 ${
                openUserMenu
                  ? "opacity-100 pointer-events-auto " + (scroll > 0 ? "top-48 md:top-54" : "top-36")
                  : "opacity-0 pointer-events-none top-64"
              }`}
            >
              <Link
                href={"/app/account"}
                className="flex items-center gap-6 u-transition-color hover:bg-white/10 cursor-pointer p-6 px-12 rounded-4 whitespace-nowrap"
              >
                <Icon icon="ph:user" className="w-16 h-16 flex-none" />
                My Account
              </Link>
              <div
                className="flex items-center gap-6 u-transition-color hover:bg-white/10 cursor-pointer p-6 px-12 rounded-4"
                onClick={handleLogout}
              >
                <Icon icon="material-symbols:logout" className="w-16 h-16" />
                Logout
              </div>
            </div>
          </div>
          <Link href={"/auth/login"} className={`${email ? "hidden" : "block"}`}>
            <button className=" text-button-text text-16 font-semibold py-12 px-36  rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50">
              Sign In
            </button>
          </Link>

          <div className="cursor-pointer md:hidden" onClick={() => setOpenMobile(true)}>
            <Icon icon="heroicons-outline:menu" className="w-24 h-24 text-secondary-200" />
          </div>
        </nav>
      </header>
      <div
        className={`fixed top-0 w-full h-full bg-primary-800/80 z-20 backdrop-blur-lg transition-all duration-300 flex flex-col justify-center items-center lg:hidden ${
          openMobile ? "opacity-100 left-0" : "opacity-0 left-full"
        }`}
      >
        <div className="cursor-pointer absolute right-32 top-32" onClick={() => setOpenMobile(false)}>
          <Icon icon="fontisto:close" className="w-24 h-24 text-secondary-200" />
        </div>

        <div className="g-button-text text-32 font-bold w-fit text-center">Stratis Money Service</div>
        <ul className="flex flex-col  gap-24 text-20 mt-42">
          {APP_ROUTES.map((item) => (
            <Link className=" hover:text-secondary-200 u-transition-color" href={item.path} key={item.key}>
              {item.text}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
