"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Icon } from "@iconify/react";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setAuth } from "@/store/slices/auth.slice";
import { isValidEmail } from "@/utils/string.utils";
import { apiLogin, apiGetTwoFactorInfo } from "@/api/auth.api";
import { ROLES } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAuth } from "@/config/dictionary";
import TwoFactorAuth from "@/app/components/TwoFactorAuth";

const LoginPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [tempAuthData, setTempAuthData] = useState<any>(null);
  const [show2FAAlert, setShow2FAAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.value) return setEmail({ ...email, error: dictionaryAuth.login.errorRequire[locale] });
    if (!isValidEmail(email.value)) return setEmail({ ...email, error: dictionaryAuth.login.errorInvalid[locale] });
    if (!password.value) return setPassword({ ...password, error: dictionaryAuth.login.errorRequire[locale] });

    setLoading(true);
    try {
      const result = await apiLogin(email.value, password.value);
      if (result?.isSucceed) {
        if (result.data.requiresTwoFactorAuthentication) {
          console.log(result.data);
          setTempAuthData(result.data);
          setShowTwoFactor(true);
          setLoading(false);
          return;
        }

        // No 2FA required, proceed with login
        await completeLogin(result.data);
      } else {
        if (result?.messages.email) setEmail({ ...email, error: dictionaryAuth.login.emailNotFound[locale] });
        if (result?.messages?.password)
          setPassword({ ...password, error: dictionaryAuth.login.incorrectPassword[locale] });
        toast.error(dictionaryAuth.login.toast.failure[locale]);
      }
    } catch (error) {
      console.log(error);
      toast.error(dictionaryAuth.login.toast.generalError[locale]);
    }
    setLoading(false);
  };

  const completeLogin = async (authData) => {
    if (authData.accessToken) {
      localStorage.setItem("stratis-auth-token", authData.accessToken);
      localStorage.setItem("stratis-auth-refresh", authData.refreshToken);
      const decoded = jwtDecode(authData.accessToken);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const userRole = role === "Administrator"
        ? ROLES.ADMIN
        : role === "Agent"
        ? ROLES.AGENT
        : role === "Compliance"
        ? ROLES.COMPLIANCE
        : role === "BusinessAdmin"
        ? ROLES.BUSINESS
        : decoded["UserName"] && !role
        ? ROLES.BUSINESS
        : ROLES.GUEST;
      
      dispatch(
        setAuth({
          ...authData,
          email: email.value,
          role: userRole,
        })
      );

      toast.success(dictionaryAuth.login.toast.success[locale]);
      
      // Check if user is a business user or admin and needs 2FA setup
      if (userRole === ROLES.BUSINESS || userRole === ROLES.ADMIN) {
        try {
          const twoFactorInfo = await apiGetTwoFactorInfo();
          if (twoFactorInfo?.isSucceed && twoFactorInfo.data) {
            const { isEmailEnabled, isTotpEnabled } = twoFactorInfo.data;
            
            // If neither email nor TOTP 2FA is enabled, show alert modal
            if (!isEmailEnabled && !isTotpEnabled) {
              setShow2FAAlert(true);
              return;
            }
          }
        } catch (error) {
          console.error("Failed to check 2FA status:", error);
          // Continue with normal flow if 2FA check fails
        }
      }
      
      if (authData.isVerifiedEmail) {
        router.push(userRole !== ROLES.COMPLIANCE ? "/app/order" : "/app/user");
      } else {
        router.push(`/auth/verify-email/send?email=${email.value}`);
      }
    }
  };

  const handleTwoFactorComplete = async (loginResult) => {
    if (loginResult) {
      await completeLogin(loginResult);
    } else {
      await completeLogin(tempAuthData);
    }
  };

  const handle2FAAlertConfirm = () => {
    setShow2FAAlert(false);
    router.push("/app/security/2fa");
  };

  return (
    <>
      <main className="relative w-full overflow-x-hidden">
        <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

        <div className="min-h-screen w-full max-w-1440 mx-auto relative flex flex-row-reverse items-center">
          <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
            {!showTwoFactor ? (
              <div className="w-full py-40 px-16 md:px-32 max-w-420  bg-white/5 rounded-16 items-center flex flex-col gap-24">
                <Link href={"/"}>
                  <SvgLogo className="w-50 h-50" />
                </Link>
                <div>
                  <h4 className="g-button-text w-fit mx-auto text-center">{dictionaryAuth.login.title[locale]}</h4>
                  <p className="text-gray-400 text-14 mt-8 text-center">{dictionaryAuth.login.subtitle[locale]}</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
                  <div>
                    <CustomInput
                      value={email.value}
                      onChange={(e) => setEmail({ error: "", value: e })}
                      icon="ic:round-alternate-email"
                      placeholder={dictionaryAuth.login.emailPlace[locale]}
                      error={email.error}
                    />
                  </div>
                  <div>
                    <CustomInput
                      value={password.value}
                      onChange={(e) => setPassword({ error: "", value: e })}
                      type="password"
                      icon="solar:shield-keyhole-outline"
                      placeholder={dictionaryAuth.login.pwdPlace[locale]}
                      error={password.error}
                    />
                    <Link
                      className="text-12 ml-12 text-right block mt-6 text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                      href={"/auth/forgot-password"}
                    >
                      {dictionaryAuth.login.forgot[locale]}
                    </Link>
                  </div>

                  <AnimatedSlideButton className="text-18 py-14 border border-secondary-300 rounded-full" isSubmit={true}>
                    {dictionaryAuth.login.button[locale]}
                  </AnimatedSlideButton>
                  <div className="text-center text-14 text-gray-500">
                    {dictionaryAuth.login.donhave[locale]}{" "}
                    <Link
                      href="/auth/register"
                      className="underline text-primary-400/80 u-transition-color hover:text-primary-400 focus:text-primary-400 outline-none"
                    >
                      {dictionaryAuth.login.signup[locale]}
                    </Link>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full py-40 px-16 md:px-32 max-w-420 bg-white/5 rounded-16 items-center flex flex-col gap-24">
                <Link href={"/"}>
                  <SvgLogo className="w-50 h-50" />
                </Link>
                <TwoFactorAuth
                  onComplete={handleTwoFactorComplete}
                  availableFactors={tempAuthData?.availableFactors || []}
                  twoFactorToken={tempAuthData?.twoFactorToken || ""}
                  userId={tempAuthData?.userId || ""}
                />
              </div>
            )}
          </div>
        </div>

        {/* 2FA Alert Modal */}
        {show2FAAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#192C37] rounded-16 p-24 w-full max-w-420">
              <div className="flex justify-between items-center mb-16">
                <h4 className="text-20 font-semibold">{dictionaryAuth.twoFactorAlert.title[locale]}</h4>
              </div>
              
              <div className="flex flex-col gap-16 mb-24">
                <div className="flex items-center gap-12">
                  <Icon icon="material-symbols-light:shield-lock-outline-rounded" className="text-secondary-400 text-24" />
                  <p className="text-16">
                    {dictionaryAuth.twoFactorAlert.message[locale]}
                  </p>
                </div>
                <p className="text-14 text-gray-400">
                  {dictionaryAuth.twoFactorAlert.description[locale]}
                </p>
              </div>

              <button
                onClick={handle2FAAlertConfirm}
                className="w-full text-button-text font-semibold p-32 text-16 py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
              >
                {dictionaryAuth.twoFactorAlert.continueButton[locale]}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default LoginPage;
