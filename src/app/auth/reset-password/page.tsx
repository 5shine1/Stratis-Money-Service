"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { apiResetPassword } from "@/api/auth.api";
import { isValidPassword } from "@/utils/string.utils";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAuth } from "@/config/dictionary";

const ResetPasswordPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const searchParams = useSearchParams();
  const email = searchParams.get("email").replace(" ", "+");
  const code = searchParams.get("code");
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });
  const [url, setUrl] = useState("");
      
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.value)
      return setPassword({ ...password, error: dictionaryAuth.resetPassword.errors.passwordRequired[locale] });
    if (isValidPassword(password.value, locale))
      return setPassword({
        ...password,
        error: isValidPassword(password.value, locale),
      });
    if (passwordConfirm.value !== password.value)
      return setPasswordConfirm({
        ...passwordConfirm,
        error: dictionaryAuth.resetPassword.errors.passwordMismatch[locale],
      });
    try {
      setLoading(true);
      const result = await apiResetPassword(code, password.value, email);
      if (result) {
        toast.success(dictionaryAuth.resetPassword.toastMessages.success[locale]);
        router.push("/auth/login");
      } else toast.error(dictionaryAuth.resetPassword.toastMessages.error[locale]);
    } catch (error) {
      toast.error(dictionaryAuth.resetPassword.toastMessages.error[locale]);
    }
    setLoading(false);
  };

  return (
    <>
      <title>Reset Your Password - Stratis Money Service</title>
      {/* Open Graph Meta Tags */}
      <meta name="description" content="Reset your password securely and regain access to your Stratis Money Service account." />
      <meta property="og:title" content="Reset Your Password - Stratis Money Service" />
      <meta property="og:description" content="Reset your password securely and regain access to your Stratis Money Service account." />
      <meta property="og:url" content={`${url}/auth/reset-password?email=${email}&code=${code}`} />
      <meta property="og:site_name" content="Reset Your Password - Stratis Money Service" />
      <meta property="og:image" content={`${url}/assets/landing/meta-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Reset Your Password - Stratis Money Service" />
      <meta name="twitter:description" content="Reset your password securely and regain access to your Stratis Money Service account." />
      <meta name="twitter:image" content={`${url}/assets/landing/meta-image.png`}  />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="675" />

      <main className="relative w-full overflow-x-hidden">
        <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

        <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
          <div className="w-full h-full flex flex-col items-center justify-center px-16 py-40">
            <div className="w-full bg-white/5 rounded-16  max-w-420  flex flex-col items-center gap-32  px-16 md:px-32  py-40">
              <Link href={"/"}>
                <SvgLogo className="w-50 h-50" />
              </Link>
              <div className="w-full">
                <h4 className="g-button-text w-fit  mx-auto text-center">{dictionaryAuth.resetPassword.title[locale]}</h4>
                <p className="text-gray-400 text-14 mt-8 text-center">
                  {dictionaryAuth.resetPassword.subtitle[locale]} <span className="text-white">{email}</span>.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-24 mt-12">
                <div>
                  <CustomInput
                    value={password.value}
                    onChange={(e) => setPassword({ error: "", value: e })}
                    type="password"
                    icon="solar:shield-keyhole-outline"
                    placeholder={dictionaryAuth.resetPassword.placeholders.password[locale]}
                    error={password.error}
                  />
                </div>
                <div>
                  <CustomInput
                    value={passwordConfirm.value}
                    onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                    type="password"
                    icon="solar:shield-keyhole-outline"
                    placeholder={dictionaryAuth.resetPassword.placeholders.confirmPassword[locale]}
                    error={passwordConfirm.error}
                  />
                </div>
                <AnimatedSlideButton
                  isSubmit={true}
                  className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
                >
                  {dictionaryAuth.resetPassword.buttons.resetPassword[locale]}
                </AnimatedSlideButton>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
    
  );
};

export default ResetPasswordPage;
