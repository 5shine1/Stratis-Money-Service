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
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAuth } from "@/config/dictionary";

const RegisterPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
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
      setEmail({ ...email, error: dictionaryAuth.register.errors.emailInvalid[locale] });
    }
    if (!email.value) {
      temp++;
      setEmail({ ...email, error: dictionaryAuth.register.errors.emailRequired[locale] });
    }
    if (!name.value) {
      temp++;
      setName({ ...name, error: dictionaryAuth.register.errors.nameRequired[locale] });
    }
    if (!industry.value) {
      temp++;
      setIndustry({ ...industry, error: dictionaryAuth.register.errors.fieldRequired[locale] });
    }
    if (!activity.value) {
      temp++;
      setActivity({ ...activity, error: dictionaryAuth.register.errors.fieldRequired[locale] });
    }
    if (!volume.value) {
      temp++;
      setVolume({ ...volume, error: dictionaryAuth.register.errors.fieldRequired[locale] });
    }
    if (!country.value) {
      temp++;
      setCountry({ ...country, error: dictionaryAuth.register.errors.countryRequired[locale] });
    }
    if (!phone.value) {
      temp++;
      setPhone({ ...phone, error: dictionaryAuth.register.errors.phoneRequired[locale] });
    }
    if (!isValidPhoneNumber(phone.value)) {
      temp++;
      setPhone({ ...phone, error: dictionaryAuth.register.errors.phoneInvalid[locale] });
    }
    if (!password.value) {
      temp++;
      setPassword({ ...password, error: dictionaryAuth.register.errors.passwordRequired[locale] });
    }
    if (isValidPassword(password.value, locale)) {
      temp++;
      setPassword({
        ...password,
        error: isValidPassword(password.value, locale),
      });
    }
    if (passwordConfirm.value !== password.value) {
      temp++;
      setPasswordConfirm({
        ...passwordConfirm,
        error: dictionaryAuth.register.errors.passwordMismatch[locale],
      });
    }
    if (temp > 0) return;

    setLoading(true);
    const industryData = dictionaryAuth.register.industries["EN"]
      .at(Number(industry.value.split("-")[0]))
      ?.items?.at(Number(industry.value.split("-")[1]));
    const activityData = dictionaryAuth.register.activities["EN"]
      .at(Number(activity.value.split("-")[0]))
      ?.items?.at(Number(activity.value.split("-")[1]));
    const volumeData = dictionaryAuth.register.volumes["EN"]
      .at(Number(volume.value.split("-")[0]))
      ?.items?.at(Number(volume.value.split("-")[1]));
    try {
      const result = await apiRegister(
        email.value,
        password.value,
        name.value,
        country.value,
        industryData,
        activityData,
        volumeData,
        phone.value
      );
      if (result === true) {
        toast.success(dictionaryAuth.register.toast.successRegister[locale]);
        router.push(`/auth/login`);
      } else {
        if (result?.duplicate) setEmail({ ...email, error: dictionaryAuth.register.errors.duplicateUser[locale] });
        else
          setPassword({
            ...password,
            error: String(Object.values(result)[0]) || "",
          });
        toast.error(dictionaryAuth.register.toast.registerFailed[locale]);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(dictionaryAuth.register.toast.somethingWrong[locale]);
    }
    setLoading(false);
  };

  return (
    <>
      <main className="relative w-full overflow-x-hidden">
        <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

        <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
          <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
            <div className="w-full py-40 px-16 md:px-32 max-w-480  bg-white/5 rounded-16 flex flex-col gap-24 items-center">
              <Link href={"/"}>
                <SvgLogo className="w-50 h-50" />
              </Link>
              <div>
                <h4 className="g-button-text w-fit  mx-auto text-center ">{dictionaryAuth.register.title[locale]}</h4>
                <p className="text-gray-400 text-14 mt-8 text-center">{dictionaryAuth.register.subtitle[locale]}</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
                <CustomInput
                  value={name.value}
                  onChange={(e) => setName({ error: "", value: e })}
                  icon="solar:user-outline"
                  placeholder={dictionaryAuth.register.placeholders.name[locale]}
                  error={name.error}
                />
                <CustomSelectInput
                  value={
                    industry.value
                      ? dictionaryAuth.register.industries[locale]
                          .at(industry.value.split("-")[0])
                          ?.items?.at(industry.value.split("-")[1])
                      : ""
                  }
                  onChange={(e) => setIndustry({ error: "", value: e })}
                  icon="ph:buildings-light"
                  placeholder={dictionaryAuth.register.placeholders.industry[locale]}
                  data={dictionaryAuth.register.industries[locale]}
                  error={industry.error}
                />
                <CustomSelectInput
                  value={
                    activity.value
                      ? dictionaryAuth.register.activities[locale]
                          .at(activity.value.split("-")[0])
                          ?.items?.at(activity.value.split("-")[1])
                      : ""
                  }
                  onChange={(e) => setActivity({ error: "", value: e })}
                  icon="material-symbols-light:service-toolbox-outline-rounded"
                  placeholder={dictionaryAuth.register.placeholders.activity[locale]}
                  data={dictionaryAuth.register.activities[locale]}
                  error={activity.error}
                />
                <CustomSelectInput
                  value={
                    volume.value
                      ? dictionaryAuth.register.volumes[locale]
                          .at(volume.value.split("-")[0])
                          ?.items?.at(volume.value.split("-")[1])
                      : ""
                  }
                  onChange={(e) => setVolume({ error: "", value: e })}
                  icon="solar:chat-round-money-linear"
                  placeholder={dictionaryAuth.register.placeholders.volume[locale]}
                  data={dictionaryAuth.register.volumes[locale]}
                  error={volume.error}
                />
                <CustomInput
                  value={country.value}
                  onChange={(e) => setCountry({ error: "", value: e })}
                  icon="carbon:location"
                  placeholder={dictionaryAuth.register.placeholders.country[locale]}
                  error={country.error}
                />
                <CustomInput
                  value={phone.value}
                  onChange={(e) => setPhone({ error: "", value: e })}
                  icon="radix-icons:mobile"
                  placeholder={dictionaryAuth.register.placeholders.phone[locale]}
                  error={phone.error}
                />
                <CustomInput
                  value={email.value}
                  onChange={(e) => setEmail({ error: "", value: e })}
                  type="email"
                  icon="ic:round-alternate-email"
                  placeholder={dictionaryAuth.register.placeholders.email[locale]}
                  error={email.error}
                />
                <CustomInput
                  value={password.value}
                  onChange={(e) => setPassword({ error: "", value: e })}
                  type="password"
                  icon="solar:shield-keyhole-outline"
                  placeholder={dictionaryAuth.register.placeholders.password[locale]}
                  error={password.error}
                />
                <CustomInput
                  value={passwordConfirm.value}
                  onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                  type="password"
                  icon="solar:shield-keyhole-outline"
                  placeholder={dictionaryAuth.register.placeholders.confirmPassword[locale]}
                  error={passwordConfirm.error}
                />
                <AnimatedSlideButton
                  className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
                  isSubmit={true}
                >
                  {dictionaryAuth.register.button[locale]}
                </AnimatedSlideButton>
                <div className="text-center text-14 text-gray-500">
                  {dictionaryAuth.register.alreadyHaveAccount[locale]}{" "}
                  <Link
                    href="/auth/login"
                    className="underline text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                  >
                    {dictionaryAuth.register.login[locale]}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
