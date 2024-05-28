"use client";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import useAppSelector from "@/hooks/global/useAppSelector";
import AppSidebar from "./components/Sidebar";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email } = useAppSelector((state) => state.auth);
  if (!email) {
    router.push("/auth/login");
    return null;
  }
  return (
    <main className="w-full h-[100vh] flex gap-4">
      <AppSidebar />
      <section className="p-8 w-full h-screen overflow-auto">
        {children}
      </section>
    </main>
  );
};

export default AppLayout;
