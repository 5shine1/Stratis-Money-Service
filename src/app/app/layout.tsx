"use client";
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setCurrency } from "@/store/slices/payment.slice";
import { apiGetCurrencies } from "@/api/payment.api";
import AppSidebar from "./components/Sidebar";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiLogout } from "@/api/auth.api";
import { logout } from "@/store/slices/auth.slice";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email, isAuthLoading, isVerifiedEmail } = useAppSelector((state) => state.auth);
  const { setLoading } = useContext(LoadingContext);
  const [isKYB, setIsKYB] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetCurrencies = async () => {
    const result = await apiGetCurrencies();
    if (result) dispatch(setCurrency(result));
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      toast.success("Logout successfully");
    } catch (error) {}
    dispatch(logout());
    setLoading(false);
  };
  useEffect(() => {
    handleGetCurrencies();
  }, []); //eslint-disable-line

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
      {!isKYB && (
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
                <AnimatedSlideButton
                  onClick={() => {
                    setIsKYB(true);
                  }}
                  className=" text-primary-200 dark:text-white text-16 py-12 px-32 border border-primary-200 dark:border-secondary-300 rounded-full "
                  backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
                >
                  Start KYB
                </AnimatedSlideButton>
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
      <AppSidebar>{children}</AppSidebar>
    </>
  );
};

export default AppLayout;
