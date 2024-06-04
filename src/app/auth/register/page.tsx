"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidPassword, isValidEmail } from "@/utils/string.utils";
import { apiRegister } from "@/api/auth.api";

const RegisterPage = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = async () => {
    if (!email.value) return setEmail({ ...email, error: "Email required." });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: "Invalid email." });
    if (!password.value) return setPassword({ ...password, error: "Password required." });
    if (isValidPassword(password.value))
      return setPassword({
        ...password,
        error: isValidPassword(password.value),
      });
    if (passwordConfirm.value !== password.value)
      return setPasswordConfirm({
        ...passwordConfirm,
        error: "Password confirmation does not match.",
      });

    setLoading(true);
    try {
      const result = await apiRegister(email.value, password.value);
      if (result === true) {
        toast.success("Registered successfully.");
        router.push("/auth/login");
      } else {
        console.log(result);
        if (result?.DuplicateUserName) setEmail({ ...email, error: "Username is already taken." });
        else
          setPassword({
            ...password,
            error: String(Object.values(result)[0]) || "",
          });
        toast.error("Register failed.");
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
    setLoading(false);
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
              <h4 className="g-button-text w-fit  mx-auto text-center ">Create Your Account</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">Setting up an account takes only few minutes.</p>
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
                Continue with Email
              </AnimatedSlideButton>
              <div className="text-center text-14 text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
