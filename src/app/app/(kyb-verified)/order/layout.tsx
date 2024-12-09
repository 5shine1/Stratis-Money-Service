"use client";
import { PropsWithChildren } from "react";
import { ROLES } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";
import { useRouter } from "next/navigation";

const OrderLayout = ({ children }: PropsWithChildren) => {
  const { role } = useAppSelector((state) => state.auth);
  const router = useRouter();
  if (role === ROLES.COMPLIANCE) {
    router.replace("/app/user");
    return;
  }
  return children;
};

export default OrderLayout;
