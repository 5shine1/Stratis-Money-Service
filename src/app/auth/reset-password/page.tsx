"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { apiResetPassword } from "@/api/auth.api";
import { isValidPassword } from "@/utils/string.utils";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.value) return setPassword({ ...password, error: "Password required" });
    if (isValidPassword(password.value))
      return setPassword({
        ...password,
        error: isValidPassword(password.value),
      });
    if (passwordConfirm.value !== password.value)
      return setPasswordConfirm({
        ...passwordConfirm,
        error: "Password confirmation does not match",
      });
    try {
      setLoading(true);
      const result = await apiResetPassword(code, password.value, email);
      if (result) {
        toast.success("Password reset completed.");
        router.push("/auth/login");
      } else toast.error("Something went wrong.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-40">
          <div className="w-full bg-white/5 rounded-16  max-w-420  flex flex-col items-center gap-32  px-16 md:px-32  py-40">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div className="w-full">
              <h4 className="g-button-text w-fit  mx-auto text-center">Reset Your Password</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">
                Reset your password of <span className="text-white">{email}</span> account.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-24 mt-12">
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
                isSubmit={true}
                className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
              >
                Reset Password
              </AnimatedSlideButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
