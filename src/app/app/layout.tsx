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
  return (
    <main className="w-full h-[100vh] flex gap-4">
      <AppSidebar />
      <section className="p-8 w-full h-screen overflow-auto">{children}</section>
    </main>
  );
};

export default AppLayout;
