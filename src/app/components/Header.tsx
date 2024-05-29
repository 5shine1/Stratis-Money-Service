"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { APP_ROUTES } from "@/config/constants";
import { ScrollContext } from "@/components/providers/ScrollProvider";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import useClickOutside from "@/hooks/global/useClickOutside";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { logout } from "@/store/slices/auth.slice";
import { apiLogout } from "@/api/auth.api";
import { formattedUsername } from "@/utils/string.utils";

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
        className={`z-10 fixed top-0  left-0 w-full px-16 transition-all duration-300 ${
          scroll > 0 ? "bg-black/30 backdrop-blur-lg py-16 shadow-md" : "py-32"
        }`}
      >
        <nav className="flex items-center gap-8 max-w-1440 mx-auto">
          <Link href={"/"} className="mr-auto flex gap-16 items-center">
            <SvgLogo className={"w-36 h-36 lg:w-48 lg:h-48"} />
            <span className="text-32 font-bold hidden md:inline">
              Stratis Payment
            </span>
          </Link>
          <ul className="items-center gap-48 hidden md:flex">
            {APP_ROUTES.map((item) => (
              <Link
                className=" hover:text-secondary-200 u-transition-color"
                href={item.path}
                key={item.key}
              >
                {item.text}
              </Link>
            ))}
          </ul>
          <div
            className={`ml-auto relative  ${email ? "block" : "hidden"}`}
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
                className={`w-20 h-20 duration-200 transition-all ${
                  openUserMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`absolute right-0 transition-all duration-200 flex flex-col gap-4 bg-primary-600 shadow-lg p-6 rounded-8 ${
                openUserMenu
                  ? "opacity-100 pointer-events-auto " +
                    (scroll > 0 ? "top-48 md:top-54" : "top-36")
                  : "opacity-0 pointer-events-none top-64"
              }`}
            >
              <div className="flex items-center gap-6 u-transition-color hover:bg-white/10 cursor-pointer p-6 px-12 rounded-4">
                <Icon icon="ph:user" className="w-16 h-16" />
                Profile
              </div>
              <div
                className="flex items-center gap-6 u-transition-color hover:bg-white/10 cursor-pointer p-6 px-12 rounded-4"
                onClick={handleLogout}
              >
                <Icon icon="material-symbols:logout" className="w-16 h-16" />
                Logout
              </div>
            </div>
          </div>
          <Link
            href={"/auth/login"}
            className={`ml-auto ${email ? "hidden" : "block"}`}
          >
            <AnimatedSlideButton className="border border-secondary-300 px-24 py-8 lg:text-18 lg:py-10 lg:px-32">
              Sign In
            </AnimatedSlideButton>
          </Link>

          <div
            className="cursor-pointer md:hidden"
            onClick={() => setOpenMobile(true)}
          >
            <Icon
              icon="heroicons-outline:menu"
              className="w-24 h-24 text-secondary-200"
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
            className="w-24 h-24 text-secondary-200"
          />
        </div>

        <div className="g-button-text text-32 font-bold w-fit">
          Stratis Payment
        </div>
        <ul className="flex flex-col  gap-24 text-24 mt-42">
          {APP_ROUTES.map((item) => (
            <Link
              className=" hover:text-secondary-200 u-transition-color"
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
