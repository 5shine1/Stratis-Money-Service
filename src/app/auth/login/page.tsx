"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setAuth } from "@/store/slices/auth.slice";
import { isValidEmail } from "@/utils/string.utils";
import { apiLogin } from "@/api/auth.api";
import { ROLES } from "@/@types/common";

const LoginPage = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.value) return setEmail({ ...email, error: "Email required." });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: "Invalid email." });
    if (!password.value) return setPassword({ ...password, error: "Password required." });

    setLoading(true);
    try {
      const result = await apiLogin(email.value, password.value);
      if (result?.isSucceed) {
        localStorage.setItem("stratis-auth-token", result?.data?.accessToken);
        localStorage.setItem("stratis-auth-refresh", result?.data?.refreshToken);
        const decoded = jwtDecode(result?.data?.accessToken);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        dispatch(
          setAuth({
            ...result?.data,
            email: email.value,
            role:
              role === "Administrator"
                ? ROLES.ADMIN
                : Array.isArray(role) && role[0] === "Agent"
                ? ROLES.AGENT
                : role === "Compliance"
                ? ROLES.COMPLIANCE
                : decoded["UserName"] && !role
                ? ROLES.BUSINESS
                : ROLES.GUEST,
          })
        );

        toast.success("Logged in successfully.");
        if (result?.data?.isVerifiedEmail) {
          router.push(role !== ROLES.COMPLIANCE ? "/app/order" : "/app/user");
        } else {
          router.push(`/auth/verify-email/send?email=${email.value}`);
        }
      } else {
        if (result?.messages.email) setEmail({ ...email, error: "Email not found." });
        if (result?.messages?.password) setPassword({ ...password, error: "Incorrect password." });
        toast.error("Login failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full max-w-1440 mx-auto relative flex flex-row-reverse items-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
          <div className="w-full py-40 px-16 md:px-32 max-w-420  bg-white/5 rounded-16 items-center flex flex-col gap-24">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div>
              <h4 className="g-button-text w-fit mx-auto text-center">Sign In Your Account</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">Welcome to stratis money service. Enjoy now!</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
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

              <AnimatedSlideButton className=" text-18 py-14 border border-secondary-300 rounded-full" isSubmit={true}>
                Login with Email
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
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
