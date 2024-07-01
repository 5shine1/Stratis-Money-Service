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
  const [name, setName] = useState({ value: "", error: "" });
  const [country, setCountry] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.value) return setEmail({ ...email, error: "Email required." });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: "Invalid email." });
    if (!name.value) return setName({ ...name, error: "Name required." });
    if (!country.value) return setCountry({ ...country, error: "Country required." });
    if (!phone.value) return setPhone({ ...phone, error: "Mobile phone required." });
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
      const result = await apiRegister(email.value, password.value, name.value, country.value, phone.value);
      if (result === true) {
        toast.success("Registered successfully.");
        router.push(`/auth/verify-email/send?email=${email.value}`);
        return;
      } else {
        if (result?.DuplicateUserName) setEmail({ ...email, error: "Username is already taken." });
        else
          setPassword({
            ...password,
            error: String(Object.values(result)[0]) || "",
          });
        toast.error("Register failed.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        <div className="w-full p-12 relative hidden lg:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3">
            <div className=" relative w-full rounded-32 aspect-square bg-primary-200/10 animate-spinSlow"></div>
            <img
              src="/assets/auth/register.png "
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5"
            />
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
          <div className="w-full py-40 px-16 md:px-32 max-w-480  bg-white/5 rounded-16 flex flex-col gap-24 items-center">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div>
              <h4 className="g-button-text w-fit  mx-auto text-center ">Create Your Account</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">Setting up an account takes only a few minutes.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
              <CustomInput
                value={email.value}
                onChange={(e) => setEmail({ error: "", value: e })}
                icon="ic:round-alternate-email"
                placeholder="Email Address"
                error={email.error}
              />
              <CustomInput
                value={name.value}
                onChange={(e) => setName({ error: "", value: e })}
                icon="solar:user-outline"
                placeholder="User Name"
                error={name.error}
              />
              <CustomInput
                value={country.value}
                onChange={(e) => setCountry({ error: "", value: e })}
                icon="carbon:location"
                placeholder="Country"
                error={country.error}
              />
              <CustomInput
                value={phone.value}
                onChange={(e) => setPhone({ error: "", value: e })}
                icon="radix-icons:mobile"
                placeholder="Mobile Number"
                error={phone.error}
              />
              <CustomInput
                value={password.value}
                onChange={(e) => setPassword({ error: "", value: e })}
                type="password"
                icon="solar:shield-keyhole-outline"
                placeholder="Password"
                error={password.error}
              />
              <CustomInput
                value={passwordConfirm.value}
                onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                type="password"
                icon="solar:shield-keyhole-outline"
                placeholder="Confirm Password"
                error={passwordConfirm.error}
              />
              <AnimatedSlideButton
                className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
                isSubmit={true}
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
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
