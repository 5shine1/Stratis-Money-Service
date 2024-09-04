"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiResendVerificationEmail } from "@/api/auth.api";

const VerifyEmailSendPage = () => {
  const [isSent, setIsSent] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { setLoading } = useContext(LoadingContext);

  const handleResendEmail = async () => {
    if (!email) return toast.error("Email not exist.");
    setLoading(true);
    try {
      const result = await apiResendVerificationEmail(email);
      if (result) {
        toast.success("Sent an email successfully.");
        setIsSent(true);
      } else toast.error("Something went wrong.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-32">
          <div className="w-full items-center py-40 px-24 max-w-640  bg-white/5 rounded-16 flex flex-col gap-24 ">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div>
              <h4 className="g-button-text text-center">Verify Your Email</h4>
              <p className="text-gray-400 text-16 mt-24 text-center">
                A verification email has been sent <span className="text-success">{email}</span>. Please check your
                email inbox and click the link to verify your email.
              </p>
            </div>

            <div className="text-center text-14 text-gray-500 flex flex-col items-center w-full max-w-400 mx-auto">
              If you do not receive the email within the next 5 minutes, use the button below to resend verification
              email.
              <AnimatedSlideButton
                onClick={handleResendEmail}
                className=" text-18 py-12 px-32 w-fit border border-secondary-300 rounded-full mt-16 text-white"
              >
                {isSent ? "Resend" : "Send"} Email
              </AnimatedSlideButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmailSendPage;
