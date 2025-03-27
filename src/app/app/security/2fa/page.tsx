"use client";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TwoFactorAuth from "@/app/components/TwoFactorAuth";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiGetTwoFactorInfo, apiDisable2FA } from "@/api/auth.api";
import IconBox from "@/components/global/IconBox";
import { dictionarySecurity } from "@/config/dictionary";
import useAppSelector from "@/hooks/global/useAppSelector";
interface TwoFactorInfo {
  isEmailEnabled: boolean;
  isTotpEnabled: boolean;
  requiresTwoFactors: boolean;
  lastEmailVerification: string | null;
  lastTotpVerification: string | null;
}

const TwoFactorSetupPage = () => {
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState<TwoFactorInfo | null>(null);
  const [setupType, setSetupType] = useState<"email" | "totp" | null>(null);
  const { locale } = useAppSelector((state) => state.locale);

  const fetchStatus = async () => {
    try {
      const result = await apiGetTwoFactorInfo();
      setStatus(result?.data);
    } catch (error) {
      toast.error(dictionarySecurity.toast.error.get2FA[locale]);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []); //eslint-disable-line

  const handleDisable = async (type: "email" | "totp") => {
    setLoading(true);
    try {
      const result = await apiDisable2FA(type);
      if (result?.isSucceed) {
        toast.success(
          type === "email"
            ? dictionarySecurity.toast.success.emailAuthenticationDisabled[locale]
            : dictionarySecurity.toast.success.totpAuthenticationDisabled[locale]
        );
        await fetchStatus();
      }
    } catch (error) {
      toast.error(
        type === "email"
          ? dictionarySecurity.toast.error.emailAuthenticationDisabled[locale]
          : dictionarySecurity.toast.error.totpAuthenticationDisabled[locale]
      );
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    setSetupType(null);
    await fetchStatus();
    toast.success(dictionarySecurity.toast.success.authenticationSetup[locale]);
  };

  if (setupType) {
    return (
      <main className="relative py-40 px-12 flex justify-center items-center h-full">
        <TwoFactorAuth isSetup setupType={setupType} onComplete={handleComplete} />
      </main>
    );
  }

  return (
    <>
      <main className="h-full relative py-40 px-12 flex justify-center items-center">
        <div className="w-full max-w-720 flex flex-col gap-24">
          <h4 className="mb-24 text-center">{dictionarySecurity.title[locale]}</h4>

          <div className="flex flex-col md:flex-row gap-24">
            {/* TOTP Section */}
            <div className=" rounded-16 p-24 g-box-back border border-[#07263C] flex flex-col gap-32 w-full">
              <div className="flex items-center gap-24 flex-col">
                <IconBox icon="material-symbols-light:qr-code-scanner-rounded" />
                <h3 className="text-18 font-semibold flex-wrap text-center">
                  {dictionarySecurity.authenticatorApp[locale]} (TOTP)
                </h3>
              </div>
              <p className="text-center">
                {status?.isTotpEnabled
                  ? dictionarySecurity.text.totpAuthEnable[locale]
                  : dictionarySecurity.text.secureAccountWithApp[locale]}
              </p>
              {status?.isTotpEnabled ? (
                <button
                  onClick={() => handleDisable("totp")}
                  className="mt-auto mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                >
                  {dictionarySecurity.disable[locale]} TOTP
                </button>
              ) : (
                <button
                  onClick={() => setSetupType("totp")}
                  className="mt-auto mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                >
                  {dictionarySecurity.setup[locale]} TOTP
                </button>
              )}
            </div>

            {/* Email Section */}
            <div className=" rounded-16 p-24 g-box-back border border-[#07263C] flex flex-col gap-32 w-full">
              <div className="flex items-center gap-24 flex-col">
                <IconBox icon="material-symbols-light:mark-email-read-outline-rounded" />
                <h3 className="text-18 font-semibold">
                  {dictionarySecurity.email[locale] + " " + dictionarySecurity.authentication[locale]}
                </h3>
              </div>
              <p className="text-center">
                {status?.isEmailEnabled
                  ? dictionarySecurity.text.emailAuthEnable[locale]
                  : dictionarySecurity.text.secureAccountWithemail[locale]}
              </p>
              {status?.isEmailEnabled ? (
                <button
                  onClick={() => handleDisable("email")}
                  className="mt-auto mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                >
                  {dictionarySecurity.disable[locale] + " " + dictionarySecurity.email[locale]}
                </button>
              ) : (
                <button
                  onClick={() => setSetupType("email")}
                  className="mt-auto mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                >
                  {dictionarySecurity.setup[locale] + " " + dictionarySecurity.email[locale]}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TwoFactorSetupPage;
