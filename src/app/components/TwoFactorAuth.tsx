"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleIcon, MicrosoftIcon, AuthyIcon } from '@/app/components/icons';
import QRCode from "react-qr-code";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import CustomInput from "@/components/global/CustomInput";
import {
  apiEnable2FA,
  apiVerify2FASetup,
  apiGenerateLoginCode,
  apiVerifyTwoFactorLogin,
  apiGetTwoFactorInfo,
} from "@/api/auth.api";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionarySecurity } from "@/config/dictionary";

const EMAIL_VERIFICATION_TIMEOUT = 300; // 5 minutes in seconds

interface TwoFactorInfo {
  isEmailEnabled: boolean;
  isTotpEnabled: boolean;
  requiresTwoFactors: boolean;
  lastEmailVerification: string | null;
  lastTotpVerification: string | null;
}

interface Props {
  onComplete?: (loginResult: any) => void; //eslint-disable-line
  isSetup?: boolean;
  availableFactors?: string[];
  setupType?: "email" | "totp";
  twoFactorToken?: string;
  userId?: string;
}

const TwoFactorAuth: React.FC<Props> = ({
  onComplete,
  isSetup = false,
  availableFactors = [],
  setupType,
  twoFactorToken = "",
  userId = "",
}) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [totpSecret, setTotpSecret] = useState("");
  const [totpCode, setTotpCode] = useState({ value: "", error: "" });
  const [emailCode, setEmailCode] = useState({ value: "", error: "" });
  const [step, setStep] = useState(() => {
    if (isSetup) {
      return 1;
    } else {
      // For login flow
      if (availableFactors.includes("email")) {
        return 2; // Show email verification
      } else if (availableFactors.includes("totp")) {
        return 3; // Show TOTP verification
      }
      return 1;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const hasGeneratedEmailCode = useRef(false);
  const [methodsStatus, setMethodsStatus] = useState<TwoFactorInfo | null>(null); //eslint-disable-line
  const [timeLeft, setTimeLeft] = useState(EMAIL_VERIFICATION_TIMEOUT);
  const [timerActive, setTimerActive] = useState(false);
  const [isSetTimer, setIsSetTimer] = useState(false);
  const [expireTime, setExpireTime] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent));
  }, []);

  useEffect(() => {
    if (isSetTimer) {
      setExpireTime(Date.now() + EMAIL_VERIFICATION_TIMEOUT * 1000);
      setIsSetTimer(false);
    }
    let timer: NodeJS.Timeout;
    if (timerActive && expireTime && timeLeft > 0) {
      const updateCountdown = () => {
        setTimeLeft(expireTime - Date.now());
      };
      timer = setInterval(updateCountdown, 1000);
      updateCountdown();
    } else if (timeLeft < 0) {
      setExpireTime(null);
      setTimerActive(false);
      hasGeneratedEmailCode.current = false;
      setEmailCode((prev) => ({ ...prev, error: dictionarySecurity.toast.error.codeExpired[locale] }));
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timeLeft, locale, isSetTimer, expireTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60000);
    const remainingSeconds = Math.floor((seconds % 60000) / 1000);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setTimeLeft(EMAIL_VERIFICATION_TIMEOUT);
    setTimerActive(true);
    setIsSetTimer(true);
  };

  useEffect(() => {
    const checkMethodsStatus = async () => {
      if (isSetup) {
        try {
          const result = await apiGetTwoFactorInfo();
          setMethodsStatus(result?.data);

          // If the requested method is already enabled, complete setup
          if (
            (setupType === "totp" && result?.data?.isTotpEnabled) ||
            (setupType === "email" && result?.data?.isEmailEnabled)
          ) {
            toast.success(
              setupType === "email"
                ? dictionarySecurity.toast.success.emailAuthenticationSetup[locale]
                : dictionarySecurity.toast.success.totpAuthenticationSetup[locale]
            );
            onComplete?.(null);
            return;
          }

          // Start the appropriate setup flow
          if (setupType === "email") {
            setStep(2);
            generateEmailCode();
          } else if (setupType === "totp") {
            handleSetup();
          }
        } catch (error) {
          toast.error(dictionarySecurity.toast.error.check2FA[locale]);
        }
      }
    };

    checkMethodsStatus();
  }, [isSetup, onComplete, setupType]); //eslint-disable-line

  const handleSetup = useCallback(async () => {
    if (!isSetup || setupType !== "totp") return;

    setIsLoading(true);
    try {
      const enableResult = await apiEnable2FA("totp", locale);
      if (enableResult?.isSucceed && enableResult.data.qrCodeUri) {
        setTotpSecret(enableResult.data.qrCodeUri);
        setStep(2);
      } else {
        throw new Error(dictionarySecurity.toast.error.get2FASetupInfo[locale]);
      }
    } catch (error) {
      toast.error(dictionarySecurity.toast.error.setupTOTP[locale]);
    }
    setIsLoading(false);
  }, [locale, isSetup, setupType]);

  const generateEmailCode = useCallback(async () => {
    if (!isSetup && !availableFactors.includes("email")) return;

    if (hasGeneratedEmailCode.current) return;
    setIsGeneratingCode(true);
    try {
      hasGeneratedEmailCode.current = true;
      if (isSetup) {
        await apiEnable2FA("email", locale);
      } else {
        await apiGenerateLoginCode("email", locale, twoFactorToken, userId);
      }
      startTimer();
    } catch (error) {
      hasGeneratedEmailCode.current = false;
      toast.error(dictionarySecurity.toast.error.generateEmailCode[locale]);
    }
    setIsGeneratingCode(false);
  }, [locale, isSetup, availableFactors, twoFactorToken, userId]);

  useEffect(() => {
    if (!isSetup) {
      if (availableFactors.includes("email") && !hasGeneratedEmailCode.current) {
        generateEmailCode();
      }
    }
  }, [isSetup, availableFactors, generateEmailCode]);

  const handleVerifyTOTP = async () => {
    if (!totpCode.value) {
      setTotpCode({ ...totpCode, error: dictionarySecurity.toast.error.codeRequire[locale] });
      return;
    }

    setIsLoading(true);
    try {
      const result = isSetup
        ? await apiVerify2FASetup("totp", totpCode.value)
        : await apiVerifyTwoFactorLogin("totp", totpCode.value, userId, twoFactorToken);
      if (result?.isSucceed) {
        if (isSetup) {
          onComplete?.(null);
        } else {
          if (result.data?.loginResult?.accessToken) {
            onComplete?.(result.data.loginResult);
          } else {
            onComplete?.(null);
          }
        }
      } else {
        setTotpCode({ ...totpCode, error: dictionarySecurity.toast.error.invalidCode[locale] });
      }
    } catch (error) {
      toast.error(dictionarySecurity.toast.error.verification[locale]);
    }
    setIsLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (!emailCode.value) {
      setEmailCode({ ...emailCode, error: dictionarySecurity.toast.error.codeRequire[locale] });
      return;
    }

    if (!timerActive) {
      setEmailCode({ ...emailCode, error: dictionarySecurity.toast.error.codeExpired[locale] });
      return;
    }

    setIsLoading(true);
    try {
      const result = isSetup
        ? await apiVerify2FASetup("email", emailCode.value)
        : await apiVerifyTwoFactorLogin("email", emailCode.value, userId, twoFactorToken);
      if (result?.isSucceed) {
        if (isSetup) {
          onComplete?.(null);
        } else if (availableFactors.includes("totp")) {
          setStep(3);
        } else {
          if (result.data?.loginResult?.accessToken) {
            onComplete?.(result.data.loginResult);
          } else {
            onComplete?.(null);
          }
        }
      } else {
        setEmailCode({ ...emailCode, error: dictionarySecurity.toast.error.invalidCode[locale] });
      }
    } catch (error) {
      toast.error(dictionarySecurity.toast.error.verification[locale]);
    }
    setIsLoading(false);
  };

  const addToAuth = async () => {
    
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isAndroid) {
      window.location.href = totpSecret;
    } else if (isIOS) {
      window.open(totpSecret, "_self");
    }
  };

  return (
    <div className="flex flex-col gap-24 w-full max-w-420">
      
      {/* {step === 1 && isSetup && (
        <div className="text-center flex flex-col gap-24">
          <h4 className="text-24 font-semibold mb-12">{dictionarySecurity.text.setup2FA[locale]}</h4>
          <p className="">{dictionarySecurity.text.setup2FAExplanation[locale]}</p>
          <ul className="text-left mx-auto flex flex-col gap-8">
            <li className="flex items-center gap-8">
              <Icon icon="material-symbols-light:qr-code-scanner-rounded" className="text-secondary-main text-24" />
              {dictionarySecurity.authenticatorApp[locale]} (TOTP)
            </li>
            <li className="flex items-center gap-8">
              <Icon
                icon="material-symbols-light:mark-email-read-outline-rounded"
                className="text-secondary-main text-24"
              />
              {dictionarySecurity.email[locale]} {dictionarySecurity.authentication[locale]}
            </li>
          </ul>
          <button
            onClick={handleSetup}
            className=" text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
            disabled={isLoading}
          >
            {dictionarySecurity.beginSetup[locale]}
            {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
          </button>
        </div>
      )} */}

      {step === 2 && (
        <div>
          <div className="p-4 max-w-md mx-auto">
            <div
              className={`text-center flex flex-col gap-24 ${
                isSetup ? "g-box-back rounded-8 p-24 py-36 border border-[#07263C]" : ""
              }`}
            >
              {isSetup && setupType === "totp" ? (
                <>
                  <h4 className="text-24 font-semibold">
                    {dictionarySecurity.setup[locale]} {dictionarySecurity.authenticatorApp[locale]}
                  </h4>
                  <p className="">{dictionarySecurity.text.setupAuthExp[locale]}</p>
                  <div className="mx-auto w-180 h-180 p-12 bg-white rounded-8">
                    <QRCode value={totpSecret} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                  </div>
                  {totpSecret && isMobile && (
                    <button
                      className="mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                      onClick={addToAuth}
                      disabled={isLoading}
                    >
                      {dictionarySecurity.button.addToAuthApp[locale]}
                    </button>
                  )}
                  <div className="text-left">
                    <CustomInput
                      value={totpCode.value}
                      onChange={(e) => setTotpCode({ error: "", value: e })}
                      placeholder={dictionarySecurity.placeholder.enterDigitCode[locale]}
                      error={totpCode.error}
                    />
                  </div>
                  <button
                    className="mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                    onClick={handleVerifyTOTP}
                    disabled={isLoading}
                  >
                    {dictionarySecurity.verifyCode[locale]}
                    {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
                  </button>
                </>
              ) : (
                <>
                  <h4 className="text-24 font-semibold">
                    {dictionarySecurity.email[locale]} {dictionarySecurity.authentication[locale]}
                  </h4>
                  <p className="">{dictionarySecurity.text.verifyCodeExp[locale]}</p>
                  {isGeneratingCode ? (
                    <div className="flex items-center justify-center gap-8 text-secondary-400">
                      <Icon icon="line-md:loading-twotone-loop" className="animate-spin" />
                      <span>Sending verification code...</span>
                    </div>
                  ) : (
                    timerActive && <p className="text-secondary-400">Code expires in: {formatTime(timeLeft)}</p>
                  )}
                  <div className="text-left">
                    <CustomInput
                      value={emailCode.value}
                      onChange={(e) => setEmailCode({ error: "", value: e })}
                      placeholder={dictionarySecurity.placeholder.enterVerificationCode[locale]}
                      error={emailCode.error}
                      disabled={isGeneratingCode}
                    />
                  </div>
                  <div className="flex flex-col gap-12 items-center">
                    <button
                      className="mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                      onClick={handleVerifyEmail}
                      disabled={isLoading || isGeneratingCode || !timerActive}
                    >
                      {dictionarySecurity.verifyCode[locale]}
                      {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
                    </button>
                    <button
                      onClick={()=>{
                        generateEmailCode();
                        setEmailCode((prev) => ({ ...prev, error: "" }));
                      }}
                      disabled={timerActive || isGeneratingCode}
                      className={`text-secondary-400 text-14 hover:text-secondary-300 ${
                        timerActive || isGeneratingCode ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isGeneratingCode ? "Sending..." : dictionarySecurity.resendCode[locale]}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div> 
        </div>
        
      )}

      {step === 3 && (
        <div className="text-center flex flex-col gap-24">
          {isSetup ? (
            <>
              <h4 className="text-24 font-semibold">
                {dictionarySecurity.email[locale]} {dictionarySecurity.authentication[locale]}
              </h4>
              <p className="">{dictionarySecurity.text.verifyCodeExp[locale]}</p>
              <div className="">
                <CustomInput
                  value={emailCode.value}
                  onChange={(e) => setEmailCode({ error: "", value: e })}
                  placeholder={dictionarySecurity.placeholder.enterVerificationCode[locale]}
                  error={emailCode.error}
                />
              </div>
              <button
                className="mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                onClick={handleVerifyEmail}
                disabled={isLoading}
              >
                {dictionarySecurity.verifyEmail[locale]}
                {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
              </button>
            </>
          ) : (
            <>
              <h4 className="text-24 font-semibold">TOTP {dictionarySecurity.authentication[locale]}</h4>
              <p className="">{dictionarySecurity.enterCode[locale]}</p>
              <div className="text-left">
                <CustomInput
                  value={totpCode.value}
                  onChange={(e) => setTotpCode({ error: "", value: e })}
                  placeholder={dictionarySecurity.placeholder.enterDigitCode[locale]}
                  error={totpCode.error}
                />
              </div>
              <button
                className="mx-auto w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                onClick={handleVerifyTOTP}
                disabled={isLoading}
              >
                {dictionarySecurity.verifyCode[locale]}
                {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;
