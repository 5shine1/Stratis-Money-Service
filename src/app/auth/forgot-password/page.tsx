"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidEmail } from "@/utils/string.utils";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState({ value: "", error: "" });

  const handleSubmit = () => {
    if (!email.value) return setEmail({ ...email, error: "Email required" });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: "Invalid email" });

    router.push("/");
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -left-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex flex-row-reverse items-center">
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
          <div className="w-full  max-w-360  flex flex-col gap-48 mt-32">
            <div>
              <h4 className="g-button-text w-fit mx-auto text-center">Forgot Password?</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">
                Please enter your email address and we will send you a link to reset your password.
              </p>
            </div>
            <div>
              <CustomInput
                value={email.value}
                onChange={(e) => setEmail({ error: "", value: e })}
                icon="ic:round-alternate-email"
                placeholder="Email Address"
                error={email.error}
              />
            </div>

            <AnimatedSlideButton
              onClick={handleSubmit}
              className=" text-18 py-14 border border-secondary-300 rounded-full "
            >
              Send Link
            </AnimatedSlideButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
