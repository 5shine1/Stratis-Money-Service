"use client";
import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { ROLES } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";

const WithdrawLayout = ({ children }: PropsWithChildren) => {
  const { role } = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (role === ROLES.AGENT) {
    router.push("/404");
    return;
  }
  return children;
};

export default WithdrawLayout;
