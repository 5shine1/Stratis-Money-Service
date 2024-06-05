"use client";
import React, { PropsWithChildren } from "react";
import useAppSelector from "@/hooks/global/useAppSelector";
import AppSidebar from "./components/Sidebar";
import { useRouter } from "next/navigation";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email, isAuthLoading } = useAppSelector((state) => state.auth);
  if (isAuthLoading) return;
  if (!email) {
    router.push("/auth/login");
    return;
  }
  return <AppSidebar>{children}</AppSidebar>;
};

export default AppLayout;
