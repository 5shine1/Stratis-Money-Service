"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidPassword, isValidEmail, isValidPhoneNumber } from "@/utils/string.utils";
import { apiCompleteInvitation } from "@/api/auth.api";

type Props = {
  params: {
    id: string;
  };
};

const AgentInvitationPage = ({ params }: Props) => {
  const id = params.id;
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [country, setCountry] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp = 0;

    if (!isValidEmail(email.value)) {
      temp++;
      setEmail({ ...email, error: "Invalid email." });
    }
    if (!email.value) {
      temp++;
      setEmail({ ...email, error: "Email required." });
    }
    if (!name.value) {
      temp++;
      setName({ ...name, error: "Name required." });
    }

    if (!country.value) {
      temp++;
      setCountry({ ...country, error: "Country required." });
    }
    if (!phone.value) {
      temp++;
      setPhone({ ...phone, error: "Mobile phone required." });
    }
    if (!isValidPhoneNumber(phone.value)) {
      temp++;
      setPhone({ ...phone, error: "Incorrect phone number" });
    }
    if (!password.value) {
      temp++;
      setPassword({ ...password, error: "Password required." });
    }
    if (isValidPassword(password.value)) {
      temp++;
      setPassword({
        ...password,
        error: isValidPassword(password.value),
      });
    }
    if (passwordConfirm.value !== password.value) {
      temp++;
      setPasswordConfirm({
        ...passwordConfirm,
        error: "Password confirmation does not match.",
      });
    }
    if (temp > 0) return;

    setLoading(true);
    try {
      const result = await apiCompleteInvitation(
        id,
        email.value,
        name.value,
        country.value,
        phone.value,
        password.value
      );
      if (result.isSucceed === true) {
        toast.success("Invitation completed successfully.");
        router.push(`/auth/login`);
      } else {
        console.log(result);
        if (result?.messages?.duplicate) setEmail({ ...email, error: "User is already exist." });
        else
          setEmail({
            ...email,
            error: String(Object.values(result?.messages)[0]) || "",
          });
        toast.error("Register failed.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

      <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
          <div className="w-full py-40 px-16 md:px-32 max-w-480  bg-white/5 rounded-16 flex flex-col gap-24 items-center">
            <Link href={"/"}>
              <SvgLogo className="w-50 h-50" />
            </Link>
            <div>
              <h4 className="g-button-text w-fit  mx-auto text-center ">Agent Invitation</h4>
              <p className="text-gray-400 text-14 mt-8 text-center">Please complete this form to access as an agent.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
              <CustomInput
                value={name.value}
                onChange={(e) => setName({ error: "", value: e })}
                icon="solar:user-outline"
                placeholder="Agent Name"
                error={name.error}
              />
              <CustomInput
                value={country.value}
                onChange={(e) => setCountry({ error: "", value: e })}
                icon="carbon:location"
                placeholder="Country"
                error={country.error}
              />
              <CustomInput
                value={phone.value}
                onChange={(e) => setPhone({ error: "", value: e })}
                icon="radix-icons:mobile"
                placeholder="Mobile Number"
                error={phone.error}
              />
              <CustomInput
                value={email.value}
                onChange={(e) => setEmail({ error: "", value: e })}
                type="email"
                icon="ic:round-alternate-email"
                placeholder="Email Address"
                error={email.error}
              />
              <CustomInput
                value={password.value}
                onChange={(e) => setPassword({ error: "", value: e })}
                type="password"
                icon="solar:shield-keyhole-outline"
                placeholder="Password"
                error={password.error}
              />
              <CustomInput
                value={passwordConfirm.value}
                onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                type="password"
                icon="solar:shield-keyhole-outline"
                placeholder="Confirm Password"
                error={passwordConfirm.error}
              />
              <AnimatedSlideButton
                className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
                isSubmit={true}
              >
                Continue
              </AnimatedSlideButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AgentInvitationPage;
