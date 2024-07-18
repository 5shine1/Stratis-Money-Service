"use client";
import React, { PropsWithChildren, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiLogout } from "@/api/auth.api";
import { logout } from "@/store/slices/auth.slice";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email, isAuthLoading, isVerifiedEmail, isKnowYourBusinessPassed } = useAppSelector((state) => state.auth);
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      toast.success("Logout successfully");
    } catch (error) {}
    dispatch(logout());
    setLoading(false);
  };

  if (isAuthLoading) return;
  if (!email) {
    router.push("/auth/login");
    return;
  }
  if (email && !isVerifiedEmail) {
    router.push(`/auth/verify-email/send?email=${email}`);
    return;
  }
  return (
    <>
      {!isKnowYourBusinessPassed && (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center p-16 backdrop-blur-lg">
          <div className="bg-white rounded-8 overflow-hidden">
            <div className=" dark:bg-primary-800 bg-secondary-100/20 p-24 w-full max-w-480">
              <div className="text-error flex items-center gap-8 text-16 pb-12 border-b border-primary-800/5 dark:border-white/5">
                <Icon icon="ph:warning-duotone" className="w-20 h-20 hidden md:block" /> You need to pass KYB
                verification
              </div>
              <p className="mt-16 text-primary-200 dark:text-white/70 text-14">
                To ensure compliance and security, KYB verification is mandatory for all users. Please complete your KYB
                verification promptly to continue using our services without interruption.
              </p>
              <div className="flex items-center  justify-end gap-8 flex-wrap  mt-24">
                <Link href="/app/account">
                  <AnimatedSlideButton
                    className=" text-primary-200 dark:text-white text-16 py-12 px-32 border border-primary-200 dark:border-secondary-300 rounded-full "
                    backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
                  >
                    Start KYB
                  </AnimatedSlideButton>
                </Link>
                <AnimatedSlideButton
                  onClick={() => {
                    handleLogout();
                  }}
                  className=" text-primary-200 dark:text-white text-16 py-12 px-32 border border-primary-200 dark:border-secondary-300 rounded-full"
                  backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
                >
                  Logout
                </AnimatedSlideButton>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default AppLayout;
