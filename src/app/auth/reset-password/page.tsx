"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = () => {
    if (!password.value) return setPassword({ ...password, error: "Password required" });
    if (passwordConfirm.value !== password.value)
      return setPasswordConfirm({
        ...passwordConfirm,
        error: "Password confirmation does not match",
      });
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
          <div className="w-full  max-w-360  flex flex-col gap-24 mt-32">
            <div>
              <h4 className="g-button-text w-fit  mx-auto text-center">Reset Your Password</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">Reset your password of Test@test.com account</p>
            </div>
            <div className="flex flex-col gap-24 mt-12">
              <div>
                <CustomInput
                  value={password.value}
                  onChange={(e) => setPassword({ error: "", value: e })}
                  type="password"
                  icon="solar:shield-keyhole-outline"
                  placeholder="Password"
                  error={password.error}
                />
              </div>
              <div>
                <CustomInput
                  value={passwordConfirm.value}
                  onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                  type="password"
                  icon="solar:shield-keyhole-outline"
                  placeholder="Confirm Password"
                  error={passwordConfirm.error}
                />
              </div>
              <AnimatedSlideButton
                onClick={handleSubmit}
                className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
              >
                Reset Password
              </AnimatedSlideButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
