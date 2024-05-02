"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VerificationInput from "react-verification-input";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

const VerifyEmailPage = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/auth/verify-email");
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
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
          <div className="w-full  max-w-360  flex flex-col gap-40 mt-32">
            <div>
              <h4 className="g-button-text text-center">Verify Your Email</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">
                We have sent 6 digits verification code to your email. Please
                enter here and verify your email
              </p>
            </div>
            <div>
              <VerificationInput
                validChars="0-9"
                inputProps={{ inputMode: "numeric" }}
                classNames={{
                  container: "flex items-center gap-12 justify-center w-full",
                  character:
                    "w-50 h-50 rounded-8 bg-transparent border-primary-300 outline-none text-20 text-white",
                  characterSelected: "!border-secondary-300",
                }}
              />
            </div>
            <div className="flex flex-col gap-24">
              <AnimatedSlideButton
                onClick={handleSubmit}
                className=" text-18 py-14 border border-secondary-300 rounded-full"
              >
                Continue
              </AnimatedSlideButton>
              <div className="text-center text-14 text-gray-500">
                Didn&apos;t you get an email?{" "}
                <button className="underline text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none">
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailPage;
