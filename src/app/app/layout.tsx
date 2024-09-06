"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAppSelector from "@/hooks/global/useAppSelector";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setCurrency } from "@/store/slices/payment.slice";
import { apiGetCurrencies } from "@/api/payment.api";
import AppSidebar from "./components/Sidebar";
import { apiGetSetting } from "@/api/auth.api";
import { setSettings } from "@/store/slices/setting.slice";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email, isAuthLoading, isVerifiedEmail } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleGetCurrencies = async () => {
    const result = await apiGetCurrencies();
    if (result) dispatch(setCurrency(result));
  };
  const getSetting = async () => {
    try {
      const result = await apiGetSetting();
      dispatch(setSettings(result?.businessSettings));
    } catch (error) {}
  };
  useEffect(() => {
    handleGetCurrencies();
    getSetting();
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
  return <AppSidebar>{children}</AppSidebar>;
};

export default AppLayout;
