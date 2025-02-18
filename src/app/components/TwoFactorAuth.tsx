"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import QRCode from "react-qr-code";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import CustomInput from "@/components/global/CustomInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { apiEnable2FA, apiVerify2FASetup, apiGenerateLoginCode, apiVerifyTwoFactorLogin, apiGetTwoFactorInfo } from "@/api/auth.api";
import useAppSelector from "@/hooks/global/useAppSelector";

interface TwoFactorInfo {
  isEmailEnabled: boolean;
  isTotpEnabled: boolean;
  requiresTwoFactors: boolean;
  lastEmailVerification: string | null;
  lastTotpVerification: string | null;
}

interface Props {
  onComplete?: (loginResult: any) => void;
  isSetup?: boolean;
  requireBoth?: boolean;
  availableFactors?: string[];
  setupType?: "email" | "totp";
}

const TwoFactorAuth: React.FC<Props> = ({ onComplete, isSetup = false, requireBoth = false, availableFactors = [], setupType }) => {
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
  const hasGeneratedEmailCode = useRef(false);
  const [methodsStatus, setMethodsStatus] = useState<TwoFactorInfo | null>(null);

  useEffect(() => {
    const checkMethodsStatus = async () => {
      if (isSetup) {
        try {
          const result = await apiGetTwoFactorInfo();
          setMethodsStatus(result?.data);
          
          // If the requested method is already enabled, complete setup
          if ((setupType === 'totp' && result?.data?.isTotpEnabled) || 
              (setupType === 'email' && result?.data?.isEmailEnabled)) {
            toast.success(`${setupType.toUpperCase()} authentication is already set up`);
            onComplete?.(null);
            return;
          }

          // Start the appropriate setup flow
          if (setupType === 'email') {
            setStep(2);
            generateEmailCode();
          } else if (setupType === 'totp') {
            handleSetup();
          }
        } catch (error) {
          toast.error("Failed to check 2FA status");
        }
      }
    };
    
    checkMethodsStatus();
  }, [isSetup, onComplete, setupType]);

  const handleSetup = useCallback(async () => {
    if (!isSetup || setupType !== 'totp') return;
    
    setIsLoading(true);
    try {
      const enableResult = await apiEnable2FA("totp", locale);
      if (enableResult?.isSucceed && enableResult.data.qrCodeUri) {
        setTotpSecret(enableResult.data.qrCodeUri);
        setStep(2);
      } else {
        throw new Error("Failed to get TOTP setup information");
      }
    } catch (error) {
      toast.error("Failed to setup TOTP");
    }
    setIsLoading(false);
  }, [locale, isSetup, setupType]);

  const generateEmailCode = useCallback(async () => {
    if (!isSetup && !availableFactors.includes("email")) return;
    
    if (hasGeneratedEmailCode.current) return;
    try {
      hasGeneratedEmailCode.current = true;
      if (isSetup) {
        await apiEnable2FA("email", locale);
      } else {
        await apiGenerateLoginCode("email", locale);
      }
    } catch (error) {
      hasGeneratedEmailCode.current = false;
      toast.error("Failed to generate email code");
    }
  }, [locale, isSetup, availableFactors]);

  useEffect(() => {
    if (!isSetup) {
      if (availableFactors.includes("email") && !hasGeneratedEmailCode.current) {
        generateEmailCode();
      }
    }
  }, [isSetup, availableFactors, generateEmailCode]);

  const handleVerifyTOTP = async () => {
    if (!totpCode.value) {
      setTotpCode({ ...totpCode, error: "Please enter the code" });
      return;
    }

    setIsLoading(true);
    try {
      const result = isSetup 
        ? await apiVerify2FASetup("totp", totpCode.value)
        : await apiVerifyTwoFactorLogin("totp", totpCode.value);
      
      if (result?.isSucceed) {
        if (isSetup) {
          // For setup, complete immediately after TOTP verification
          onComplete?.(null);
        } else {
          // For login, proceed with normal flow
          if (result.data?.loginResult?.accessToken) {
            onComplete?.(result.data.loginResult);
          } else {
            onComplete?.(null);
          }
        }
      } else {
        setTotpCode({ ...totpCode, error: "Invalid code" });
      }
    } catch (error) {
      toast.error("Verification failed");
    }
    setIsLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (!emailCode.value) {
      setEmailCode({ ...emailCode, error: "Please enter the code" });
      return;
    }

    setIsLoading(true);
    try {
      const result = isSetup 
        ? await apiVerify2FASetup("email", emailCode.value)
        : await apiVerifyTwoFactorLogin("email", emailCode.value);
        
      if (result?.isSucceed) {
        if (isSetup) {
          // For setup, complete immediately after email verification
          onComplete?.(null);
        } else if (availableFactors.includes("totp")) {
          // For login, proceed to TOTP if required
          setStep(3);
        } else {
          // For login, complete if no TOTP required
          if (result.data?.loginResult?.accessToken) {
            onComplete?.(result.data.loginResult);
          } else {
            onComplete?.(null);
          }
        }
      } else {
        setEmailCode({ ...emailCode, error: "Invalid code" });
      }
    } catch (error) {
      toast.error("Verification failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-24 w-full max-w-420">
      {step === 1 && isSetup && (
        <div className="text-center">
          <h4 className="text-20 font-semibold mb-12">Set Up Two-Factor Authentication</h4>
          <p className="text-14 text-gray-400">
            To enhance your account security, we&apos;ll set up two authentication methods:
          </p>
          <ul className="text-left mt-12 space-y-8">
            <li className="flex items-center gap-8">
              <Icon icon="mdi:shield-check" className="text-secondary-main" />
              Authenticator App (TOTP)
            </li>
            <li className="flex items-center gap-8">
              <Icon icon="mdi:email-check" className="text-secondary-main" />
              Email Authentication
            </li>
          </ul>
          <AnimatedSlideButton
            onClick={handleSetup}
            className="mt-24 text-18 py-14 border border-secondary-300 rounded-full"
            isLoading={isLoading}
          >
            Begin Setup
          </AnimatedSlideButton>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          {isSetup && setupType === 'totp' ? (
            <>
              <h4 className="text-20 font-semibold mb-12">Setup Authenticator App</h4>
              <p className="text-14 text-gray-400 mb-24">
                Scan this QR code with your authenticator app (like Google Authenticator or Authy)
              </p>
              <div className="mx-auto w-180 h-180 p-12 bg-white rounded-8">
                <QRCode value={totpSecret} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
              </div>
              <div className="mt-24">
                <CustomInput
                  value={totpCode.value}
                  onChange={(e) => setTotpCode({ error: "", value: e })}
                  placeholder="Enter 6-digit code"
                  error={totpCode.error}
                />
              </div>
              <AnimatedSlideButton
                onClick={handleVerifyTOTP}
                className="mt-24 text-18 py-14 px-20 border border-secondary-300 rounded-full"
                isLoading={isLoading}
              >
                Verify Code
              </AnimatedSlideButton>
            </>
          ) : (
            <>
              <h4 className="text-20 font-semibold mb-12">Email Authentication</h4>
              <p className="text-14 text-gray-400 mb-24">
                We&apos;ve sent a verification code to your email address
              </p>
              <div className="mt-24">
                <CustomInput
                  value={emailCode.value}
                  onChange={(e) => setEmailCode({ error: "", value: e })}
                  placeholder="Enter verification code"
                  error={emailCode.error}
                />
              </div>
              <AnimatedSlideButton
                onClick={handleVerifyEmail}
                className="mt-24 text-18 py-14 px-20 border border-secondary-300 rounded-full"
                isLoading={isLoading}
              >
                Verify Code
              </AnimatedSlideButton>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          {isSetup ? (
            <>
              <h4 className="text-20 font-semibold mb-12">Email Authentication</h4>
              <p className="text-14 text-gray-400 mb-24">
                We&apos;ve sent a verification code to your email address
              </p>
              <div className="mt-24">
                <CustomInput
                  value={emailCode.value}
                  onChange={(e) => setEmailCode({ error: "", value: e })}
                  placeholder="Enter verification code"
                  error={emailCode.error}
                />
              </div>
              <AnimatedSlideButton
                onClick={handleVerifyEmail}
                className="mt-24 text-18 py-14 border border-secondary-300 rounded-full"
                isLoading={isLoading}
              >
                Verify Email
              </AnimatedSlideButton>
            </>
          ) : (
            <>
              <h4 className="text-20 font-semibold mb-12">TOTP Authentication</h4>
              <p className="text-14 text-gray-400 mb-24">
                Enter the code from your authenticator app
              </p>
              <div className="mt-24">
                <CustomInput
                  value={totpCode.value}
                  onChange={(e) => setTotpCode({ error: "", value: e })}
                  placeholder="Enter 6-digit code"
                  error={totpCode.error}
                />
              </div>
              <AnimatedSlideButton
                onClick={handleVerifyTOTP}
                className="mt-24 text-18 py-14 px-20 border border-secondary-300 rounded-full"
                isLoading={isLoading}
              >
                Verify Code
              </AnimatedSlideButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth; 