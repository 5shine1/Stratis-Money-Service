"use client";
import React, { PropsWithChildren, useContext } from "react";
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
import { ROLES } from "@/@types/common";
import { KYB_FAIL_MESSAGES } from "@/config/constants";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email, role, isAuthLoading, isVerifiedEmail, kybApplicationStatus } = useAppSelector((state) => state.auth);
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
      {role === ROLES.BUSINESS && kybApplicationStatus !== 5 && (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center p-16 backdrop-blur-lg">
          <div className="bg-white rounded-8 overflow-hidden">
            <div className=" bg-primary-800 p-24 w-full max-w-480">
              <div className="text-error flex items-center gap-8 text-16 pb-12 border-b border-white/5">
                <Icon icon="ph:warning-duotone" className="w-20 h-20 hidden md:block" />
                {KYB_FAIL_MESSAGES[kybApplicationStatus]?.title}
              </div>
              <p className="mt-16 text-white/70 text-14">{KYB_FAIL_MESSAGES[kybApplicationStatus]?.text}</p>
              <div className="flex items-center  justify-end gap-8 flex-wrap  mt-24">
                <Link href="/app/account">
                  <AnimatedSlideButton
                    className=" text-white text-16 py-12 px-32 border border-secondary-300 rounded-full "
                    backClassName="from-primary-400 to-secondary-300 "
                  >
                    {kybApplicationStatus < 3 ? "Start KYB" : kybApplicationStatus > 5 ? "Check Details" : "KYB Status"}
                  </AnimatedSlideButton>
                </Link>

                <AnimatedSlideButton
                  onClick={() => {
                    handleLogout();
                  }}
                  className=" text-white text-16 py-12 px-32 border border-secondary-300 rounded-full"
                  backClassName="from-primary-400 to-secondary-300 "
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
