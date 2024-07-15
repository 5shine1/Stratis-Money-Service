"use client";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import useAppSelector from "@/hooks/global/useAppSelector";
import { ROLES } from "@/@types/common";

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { role, isAuthLoading } = useAppSelector((state) => state.auth);
  if (isAuthLoading) return;
  if (role !== ROLES.ADMIN) {
    router.push("404");
    return;
  }
  return <div>{children}</div>;
};

export default AdminLayout;
