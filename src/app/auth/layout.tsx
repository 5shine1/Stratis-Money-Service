"use client";
import useAppSelector from "@/hooks/global/useAppSelector";
import { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  if (isAuthLoading) return null;
  return children;
};
export default AuthLayout;
