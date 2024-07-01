"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { apiConfirmEmail } from "@/api/auth.api";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setIsVerifiedEmail } from "@/store/slices/auth.slice";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");
  const [isChecking, setIsChecking] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const handleCheckEmail = async (userId, code) => {
    try {
      const result = await apiConfirmEmail(userId, code);
      setIsChecking(false);
      if (result) {
        toast.success("Email has been verified.");
        setIsSuccess(true);
        dispatch(setIsVerifiedEmail(true));
      } else {
        toast.error("Email verification failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      setIsChecking(false);
    }
  };
  useEffect(() => {
    handleCheckEmail(userId, code);
    return () => {};
  }, [userId, code]);

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        {isChecking ? (
          <div className="w-full h-full flex flex-col items-center gap-56 justify-center px-16 py-32">
            <Icon icon="line-md:loading-twotone-loop" className="w-160 h-160 text-white/70" />
            <h4 className="g-button-text w-fit  mx-auto text-center ">We are checking your email.</h4>
          </div>
        ) : (
          <>
            {isSuccess ? (
              <div className="w-full h-full flex flex-col items-center gap-32 justify-center px-16 py-32">
                <Icon icon="bi:envelope-check" className="w-120 h-120 text-white/70" />
                <h4 className="g-button-text w-fit  mx-auto text-center ">
                  Your email has been verified successfully.
                </h4>
                <Link href={"/app/order"}>
                  <AnimatedSlideButton className=" text-18 py-14 px-32 border border-secondary-300 rounded-full mt-16">
                    Go To Dashboard
                  </AnimatedSlideButton>
                </Link>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center gap-32 justify-center px-16 py-32">
                <Icon icon="bi:envelope-x" className="w-120 h-120 text-white/70" />
                <h4 className="g-button-text w-fit  mx-auto text-center ">Email verification failed.</h4>
                <Link href={"/"}>
                  <AnimatedSlideButton className=" text-18 py-14 px-32 border border-secondary-300 rounded-full mt-16">
                    Go To Home
                  </AnimatedSlideButton>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default VerifyEmailPage;
