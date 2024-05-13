"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidEmail } from "@/utils/string.utils";
import { apiLogin } from "@/api/auth.api";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = () => {
    if (!email.value) return setEmail({ ...email, error: "Email required" });
    if (!isValidEmail(email.value))
      return setEmail({ ...email, error: "Invalid email" });
    if (!password.value)
      return setPassword({ ...password, error: "Password required" });
    apiLogin(email.value, password.value);
    // router.push("/");
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full max-w-1440 mx-auto relative flex flex-row-reverse items-center">
        <div className="w-full p-12 relative hidden lg:block">
          <img
            src="/assets/landing/hero-bg.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src="/assets/landing/hero.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-72">
          <Link href={"/"}>
            <SvgLogo className="w-50 h-50" />
          </Link>
          <div className="w-full  max-w-360  flex flex-col gap-24 mt-32">
            <div>
              <h4 className="g-button-text w-fit mx-auto text-center">
                Sign In Your Account
              </h4>
              <p className="text-gray-400 text-14 mt-8 text-center">
                Welcome to stratis payment. Enjoy now!
              </p>
            </div>
            <div className="flex flex-col gap-24 mt-12">
              <div>
                <CustomInput
                  value={email.value}
                  onChange={(e) => setEmail({ error: "", value: e })}
                  icon="ic:round-alternate-email"
                  placeholder="Email Address"
                  error={email.error}
                />
              </div>
              <div>
                <CustomInput
                  value={password.value}
                  onChange={(e) => setPassword({ error: "", value: e })}
                  type="password"
                  icon="solar:shield-keyhole-outline"
                  placeholder="Password"
                  error={password.error}
                />
                <Link
                  className=" text-12 ml-12 text-right block mt-6 text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                  href={"/auth/forgot-password"}
                >
                  Forgot Password?
                </Link>
              </div>

              <AnimatedSlideButton
                onClick={handleSubmit}
                className=" text-18 py-14 border border-secondary-300 rounded-full "
              >
                Continue with Email
              </AnimatedSlideButton>
              <div className="text-center text-14 text-gray-500">
                Don&apos;t have your account?{" "}
                <Link
                  href="/auth/register"
                  className="underline text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-12 justify-center text-14 mt-12">
              <hr className="border-gray-400 w-full" />
              <span className="flex-none">Or Continue With</span>
              <hr className="border-gray-400 w-full" />
            </div>
            <div className="flex items-center justify-center gap-12">
              <button className="flex items-center justify-center gap-8 border border-secondary-200 hover:border-secondary-300 u-transition-color rounded-12 h-50 px-24 ">
                <Icon
                  icon="ri:apple-fill"
                  className="text-gray-100 w-28 h-28"
                />
                Apple
              </button>
              <button className="flex items-center justify-center gap-8 border border-secondary-200 hover:border-secondary-300 u-transition-color rounded-12 h-50 px-24 ">
                <Icon
                  icon="devicon:google"
                  className="text-gray-100 w-24 h-24"
                />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
