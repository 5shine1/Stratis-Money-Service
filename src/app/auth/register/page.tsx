"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidPassword, isValidEmail, isValidPhoneNumber } from "@/utils/string.utils";
import { apiRegister } from "@/api/auth.api";
import CustomSelectInput from "@/components/global/CustomSelectInput";
import { ACTIVITIES, INDUSTRIES, VOLUMES } from "@/config/constants";

const RegisterPage = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [industry, setIndustry] = useState({ value: "", error: "" });
  const [activity, setActivity] = useState({ value: "", error: "" });
  const [volume, setVolume] = useState({ value: "", error: "" });
  const [country, setCountry] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp = 0;

    if (!isValidEmail(email.value)) {
      temp++;
      setEmail({ ...email, error: "Invalid email." });
    }
    if (!email.value) {
      temp++;
      setEmail({ ...email, error: "Email required." });
    }
    if (!name.value) {
      temp++;
      setName({ ...name, error: "Name required." });
    }
    if (!industry.value) {
      temp++;
      setIndustry({ ...industry, error: "This field required." });
    }
    if (!activity.value) {
      temp++;
      setActivity({ ...activity, error: "This field required." });
    }
    if (!volume.value) {
      temp++;
      setVolume({ ...volume, error: "This field required." });
    }
    if (!country.value) {
      temp++;
      setCountry({ ...country, error: "Country required." });
    }
    if (!phone.value) {
      temp++;
      setPhone({ ...phone, error: "Mobile phone required." });
    }
    if (!isValidPhoneNumber(phone.value)) {
      temp++;
      setPhone({ ...phone, error: "Incorrect phone number" });
    }
    if (!password.value) {
      temp++;
      setPassword({ ...password, error: "Password required." });
    }
    if (isValidPassword(password.value)) {
      temp++;
      setPassword({
        ...password,
        error: isValidPassword(password.value),
      });
    }
    if (passwordConfirm.value !== password.value) {
      temp++;
      setPasswordConfirm({
        ...passwordConfirm,
        error: "Password confirmation does not match.",
      });
    }
    if (temp > 0) return;

    setLoading(true);
    try {
      const result = await apiRegister(
        email.value,
        password.value,
        name.value,
        country.value,
        phone.value,
        industry.value,
        activity.value,
        volume.value
      );
      if (result === true) {
        toast.success("Registered successfully.");
        router.push(`/auth/login`);
      } else {
        if (result?.duplicate) setEmail({ ...email, error: "User is already exist." });
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
                value={name.value}
                onChange={(e) => setName({ error: "", value: e })}
                icon="solar:user-outline"
                placeholder="Company Name"
                error={name.error}
              />
              <CustomSelectInput
                value={industry.value}
                onChange={(e) => setIndustry({ error: "", value: e })}
                icon="ph:buildings-light"
                placeholder="Industry or Sector"
                data={INDUSTRIES}
                error={industry.error}
              />
              <CustomSelectInput
                value={activity.value}
                onChange={(e) => setActivity({ error: "", value: e })}
                icon="material-symbols-light:service-toolbox-outline-rounded"
                placeholder="Type of Activity"
                data={ACTIVITIES}
                error={activity.error}
              />
              <CustomSelectInput
                value={volume.value}
                onChange={(e) => setVolume({ error: "", value: e })}
                icon="solar:chat-round-money-linear"
                placeholder="Expected Monthly Volume"
                data={VOLUMES}
                error={volume.error}
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
                value={email.value}
                onChange={(e) => setEmail({ error: "", value: e })}
                type="email"
                icon="ic:round-alternate-email"
                placeholder="Email Address"
                error={email.error}
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
                Register
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
