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
import { dictionaryAuth } from "@/config/dictionary";
import useAppSelector from "@/hooks/global/useAppSelector";

const ForgotPasswordPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const { setLoading } = useContext(LoadingContext);
  const [email, setEmail] = useState({ value: "", error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.value) return setEmail({ ...email, error: dictionaryAuth.forgotPassword.errors.emailRequired[locale] });
    if (!isValidEmail(email.value))
      return setEmail({ ...email, error: dictionaryAuth.forgotPassword.errors.emailInvalid[locale] });
    setLoading(true);
    try {
      const result = await apiForgotPassword(email.value);
      if (result) toast.success(dictionaryAuth.forgotPassword.noti.success[locale]);
      else toast.error(dictionaryAuth.forgotPassword.noti.fail[locale]);
    } catch (error) {
      toast.error(dictionaryAuth.forgotPassword.noti.fail[locale]);
    }
    setLoading(false);
  };

  return (
    <>
      <main className="relative w-full overflow-x-hidden">
        <div className="g-effect absolute -top-[300px] -left-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

        <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex flex-row-reverse items-center">
          <div className="w-full h-full flex flex-col items-center justify-center px-16 py-40">
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white/5 rounded-16  max-w-420  flex flex-col items-center gap-32  px-16 md:px-32  py-40"
            >
              <Link href={"/"}>
                <SvgLogo className="w-50 h-50" />
              </Link>
              <div className="w-full">
                <h4 className="g-button-text w-fit mx-auto text-center">{dictionaryAuth.forgotPassword.title[locale]}</h4>
                <p className="text-gray-400 text-14 mt-8 text-center">{dictionaryAuth.forgotPassword.subtitle[locale]}</p>
              </div>
              <div className="w-full">
                <CustomInput
                  value={email.value}
                  onChange={(e) => setEmail({ error: "", value: e })}
                  icon="ic:round-alternate-email"
                  placeholder={dictionaryAuth.forgotPassword.placeholders.email[locale]}
                  error={email.error}
                />
              </div>

              <AnimatedSlideButton
                isSubmit={true}
                className="w-full text-18 py-14 border border-secondary-300 rounded-full "
              >
                {dictionaryAuth.forgotPassword.button[locale]}
              </AnimatedSlideButton>
            </form>
          </div>
        </div>
      </main>
    </>
    
  );
};

export default ForgotPasswordPage;
