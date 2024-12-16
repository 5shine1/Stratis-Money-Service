"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiResendVerificationEmail } from "@/api/auth.api";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAuth } from "@/config/dictionary";

const VerifyEmailSendPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const searchParams = useSearchParams();
  const email = searchParams.get("email").replace(" ", "+");
  const { setLoading } = useContext(LoadingContext);

  const handleResendEmail = async () => {
    if (!email) return toast.error(dictionaryAuth.verifySend.errors.emailNotExist[locale]);
    setLoading(true);
    try {
      const result = await apiResendVerificationEmail(email);
      if (result) {
        toast.success(dictionaryAuth.verifySend.toastMessages.emailSent[locale]);
      } else toast.error(dictionaryAuth.verifySend.errors.somethingWentWrong[locale]);
    } catch (error) {
      toast.error(dictionaryAuth.verifySend.errors.somethingWentWrong[locale]);
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-32">
          <div className="w-full items-center py-40 px-24 max-w-640  bg-white/5 rounded-16 flex flex-col gap-24 ">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div>
              <h4 className="g-button-text text-center">{dictionaryAuth.verifySend.title[locale]}</h4>
              <p className="text-gray-400 text-16 mt-24 text-center">
                {dictionaryAuth.verifySend.subtitle0[locale]} <span className="text-success">{email}</span>
                {dictionaryAuth.verifySend.subtitle1[locale]}
              </p>
            </div>

            <div className="text-center text-14 text-gray-500 flex flex-col items-center w-full max-w-400 mx-auto">
              {dictionaryAuth.verifySend.resendInfo[locale]}
              <AnimatedSlideButton
                onClick={handleResendEmail}
                className=" text-18 py-12 px-32 w-fit border border-secondary-300 rounded-full mt-16 text-white"
              >
                {dictionaryAuth.verifySend.buttons.resendEmail[locale]}
              </AnimatedSlideButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailSendPage;
