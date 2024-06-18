"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidEmail } from "@/utils/string.utils";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiForgotPassword } from "@/api/auth.api";

const ForgotPasswordPage = () => {
  const { setLoading } = useContext(LoadingContext);
  const [email, setEmail] = useState({ value: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.value) return setEmail({ ...email, error: "Email required" });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: "Invalid email" });
    setLoading(true);
    try {
      const result = await apiForgotPassword(email.value);
      if (result) toast.success("Password reset email sent.");
      else toast.error("Something went wrong.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -left-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex flex-row-reverse items-center">
        <div className="w-full p-12 relative hidden lg:block">
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 rotate-12 aspect-square ">
            <div className="w-full h-full bg-primary-200/10 rounded-32 animate-spinSlow"></div>
          </div>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rotate-12 aspect-square ">
            <div
              className="w-full h-full bg-primary-400/10 rounded-32 animate-spinSlow"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
          <img
            src="/assets/auth/forgot.png "
            alt=""
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-40">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white/5 rounded-16  max-w-420  flex flex-col items-center gap-32  px-16 md:px-32  py-40"
          >
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div className="w-full">
              <h4 className="g-button-text w-fit mx-auto text-center">Forgot Password?</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">
                Please enter your email address and we will send you a link to reset your password.
              </p>
            </div>
            <div className="w-full">
              <CustomInput
                value={email.value}
                onChange={(e) => setEmail({ error: "", value: e })}
                icon="ic:round-alternate-email"
                placeholder="Email Address"
                error={email.error}
              />
            </div>

            <AnimatedSlideButton
              isSubmit={true}
              className="w-full text-18 py-14 border border-secondary-300 rounded-full "
            >
              Send Link
            </AnimatedSlideButton>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
