"use client";
import useAppSelector from "@/hooks/global/useAppSelector";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { email } = useAppSelector((state) => state.auth);
  if (email) {
    router.push("/");
    return null;
  }
  return children;
};
export default AuthLayout;
