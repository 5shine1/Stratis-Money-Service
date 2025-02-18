"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import TwoFactorAuth from "@/app/components/TwoFactorAuth";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiGetTwoFactorInfo, apiDisable2FA } from "@/api/auth.api";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

interface TwoFactorInfo {
  isEmailEnabled: boolean;
  isTotpEnabled: boolean;
  requiresTwoFactors: boolean;
  lastEmailVerification: string | null;
  lastTotpVerification: string | null;
}

const TwoFactorSetupPage = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState<TwoFactorInfo | null>(null);
  const [setupType, setSetupType] = useState<"email" | "totp" | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const result = await apiGetTwoFactorInfo();
      setStatus(result?.data);
    } catch (error) {
      toast.error("Failed to get 2FA status");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDisable = async (type: "email" | "totp") => {
    setLoading(true);
    try {
      const result = await apiDisable2FA(type);
      if (result?.isSucceed) {
        toast.success(`${type.toUpperCase()} authentication disabled`);
        await fetchStatus();
      }
    } catch (error) {
      toast.error(`Failed to disable ${type.toUpperCase()} authentication`);
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    setSetupType(null);
    await fetchStatus();
    toast.success("Two-factor authentication has been set up successfully");
  };

  if (setupType) {
    return (
      <main className="overflow-x-hidden relative py-40 px-12 flex justify-center items-center min-h-screen">
        <TwoFactorAuth 
          isSetup
          setupType={setupType}
          onComplete={handleComplete}
        />
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden relative py-40 px-12 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-720 flex flex-col gap-24">
        <h2 className="text-24 font-semibold mb-24">Two-Factor Authentication</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* TOTP Section */}
          <div className="bg-primary-900/50 rounded-16 p-24">
            <div className="flex items-center gap-12 mb-16">
              <Icon icon="mdi:shield-check" className="text-secondary-main w-24 h-24" />
              <h3 className="text-18 font-semibold">Authenticator App (TOTP)</h3>
            </div>
            <p className="text-14 text-gray-400 mb-24">
              {status?.isTotpEnabled 
                ? "TOTP authentication is enabled" 
                : "Secure your account with an authenticator app"}
            </p>
            {status?.isTotpEnabled ? (
              <AnimatedSlideButton
                onClick={() => handleDisable('totp')}
                className="w-full text-16 py-12 border border-red-500 text-red-500 rounded-full hover:bg-red-500/10"
              >
                Disable TOTP
              </AnimatedSlideButton>
            ) : (
              <AnimatedSlideButton
                onClick={() => setSetupType('totp')}
                className="w-full text-16 py-12 border border-secondary-300 rounded-full"
              >
                Setup TOTP
              </AnimatedSlideButton>
            )}
          </div>

          {/* Email Section */}
          <div className="bg-primary-900/50 rounded-16 p-24">
            <div className="flex items-center gap-12 mb-16">
              <Icon icon="mdi:email-check" className="text-secondary-main w-24 h-24" />
              <h3 className="text-18 font-semibold">Email Authentication</h3>
            </div>
            <p className="text-14 text-gray-400 mb-24">
              {status?.isEmailEnabled 
                ? "Email authentication is enabled" 
                : "Secure your account with email verification"}
            </p>
            {status?.isEmailEnabled ? (
              <AnimatedSlideButton
                onClick={() => handleDisable('email')}
                className="w-full text-16 py-12 border border-red-500 text-red-500 rounded-full hover:bg-red-500/10"
              >
                Disable Email
              </AnimatedSlideButton>
            ) : (
              <AnimatedSlideButton
                onClick={() => setSetupType('email')}
                className="w-full text-16 py-12 border border-secondary-300 rounded-full"
              >
                Setup Email
              </AnimatedSlideButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TwoFactorSetupPage; 