"use client";
import useAppSelector from "@/hooks/global/useAppSelector";
import { PropsWithChildren } from "react";
import NotFoundPage from "../components/NotFoundPage";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { email, isAuthLoading, isVerifiedEmail } = useAppSelector((state) => state.auth);
  if (isAuthLoading) return null;
  if (email && isVerifiedEmail) {
    return <NotFoundPage />;
  }
  return children;
};
export default AuthLayout;
