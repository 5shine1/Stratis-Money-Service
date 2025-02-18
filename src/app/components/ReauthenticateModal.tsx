"use client";
import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import CustomInput from "@/components/global/CustomInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { apiReauthenticate } from "@/api/auth.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReauthenticateModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [totpCode, setTotpCode] = useState({ value: "", error: "" });
  const [emailCode, setEmailCode] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!totpCode.value) {
      setTotpCode({ ...totpCode, error: "Please enter the TOTP code" });
      return;
    }
    if (!emailCode.value) {
      setEmailCode({ ...emailCode, error: "Please enter the email code" });
      return;
    }

    setIsLoading(true);
    try {
      // Verify TOTP first
      const totpResult = await apiReauthenticate("totp", totpCode.value);
      if (!totpResult?.isSucceed) {
        setTotpCode({ ...totpCode, error: "Invalid TOTP code" });
        return;
      }

      // Then verify email code
      const emailResult = await apiReauthenticate("email", emailCode.value);
      if (!emailResult?.isSucceed) {
        setEmailCode({ ...emailCode, error: "Invalid email code" });
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error("An error occurred during re-authentication");
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#192C37] rounded-16 p-24 w-full max-w-420">
        <div className="flex justify-between items-center mb-24">
          <h4 className="text-20 font-semibold">Re-authenticate</h4>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <Icon icon="mdi:close" className="w-24 h-24" />
          </button>
        </div>
        
        <p className="text-14 text-gray-400 mb-24">
          This action requires re-authentication. Please enter your verification codes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-24">
          <div>
            <CustomInput
              value={totpCode.value}
              onChange={(e) => setTotpCode({ error: "", value: e })}
              placeholder="Enter TOTP code"
              error={totpCode.error}
            />
          </div>
          <div>
            <CustomInput
              value={emailCode.value}
              onChange={(e) => setEmailCode({ error: "", value: e })}
              placeholder="Enter email code"
              error={emailCode.error}
            />
          </div>

          <AnimatedSlideButton
            className="text-18 py-14 border border-secondary-300 rounded-full"
            isSubmit={true}
            isLoading={isLoading}
          >
            Verify
          </AnimatedSlideButton>
        </form>
      </div>
    </div>
  );
};

export default ReauthenticateModal; 