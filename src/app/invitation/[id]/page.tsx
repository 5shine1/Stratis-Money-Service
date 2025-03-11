"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import SvgLogo from "@/assets/SvgLogo";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomInput from "@/components/global/CustomInput";
import { isValidPassword, isValidEmail, isValidPhoneNumber } from "@/utils/string.utils";
import { apiCompleteInvitation, apiGetInviteInfo } from "@/api/auth.api";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryInvitation } from "@/config/dictionary";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setLocale } from "@/store/slices/locale.slice";
import { LOCALES } from "@/config/constants";

type Props = {
  params: {
    id: string;
  };
};

const AgentInvitationPage = ({ params }: Props) => {
  const { locale } = useAppSelector((state) => state.locale);
  const dispatch = useAppDispatch();
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
  const [isLoading, setIsLoading] = useState(true);
  const [inviteInfo, setInviteInfo] = useState<any>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp = 0;

    if (!isValidEmail(email.value)) {
      temp++;
      setEmail({ ...email, error: dictionaryInvitation.errors.invalidEmail[locale] });
    }
    if (!email.value) {
      temp++;
      setEmail({ ...email, error: dictionaryInvitation.errors.required[locale] });
    }
    if (!name.value) {
      temp++;
      setName({ ...name, error: dictionaryInvitation.errors.required[locale] });
    }

    if (!country.value) {
      temp++;
      setCountry({ ...country, error: dictionaryInvitation.errors.required[locale] });
    }
    if (!phone.value) {
      temp++;
      setPhone({ ...phone, error: dictionaryInvitation.errors.required[locale] });
    }
    if (!isValidPhoneNumber(phone.value)) {
      temp++;
      setPhone({ ...phone, error: dictionaryInvitation.errors.invalidPhone[locale] });
    }
    if (!password.value) {
      temp++;
      setPassword({ ...password, error: dictionaryInvitation.errors.required[locale] });
    }
    if (isValidPassword(password.value, locale)) {
      temp++;
      setPassword({
        ...password,
        error: isValidPassword(password.value, locale),
      });
    }
    if (passwordConfirm.value !== password.value) {
      temp++;
      setPasswordConfirm({
        ...passwordConfirm,
        error: dictionaryInvitation.errors.passwordMismatch[locale],
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
        toast.success(dictionaryInvitation.toast.invitationCompleted[locale]);
        router.push(`/auth/login`);
      } else {
        if (result?.messages?.duplicate)
          setEmail({ ...email, error: dictionaryInvitation.errors.duplicateUser[locale] });
        else
          setEmail({
            ...email,
            error: String(Object.values(result?.messages)[0]) || "",
          });
        toast.error(dictionaryInvitation.errors.registerFailed[locale]);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(dictionaryInvitation.toast.serverError[locale]);
    }
    setLoading(false);
  };
  const handleGetInfo = async () => {
    setIsLoading(true);
    try {
      const result = await apiGetInviteInfo(id);
      setInviteInfo(result);
      setEmail({ value: result?.emailAddress || "", error: "" });
    } catch (error) {
      router.push(`/404`);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetInfo();
  }, [id]); // eslint-disable-line

  return (
    <>
      {isLoading ? null : (
        <main className="relative w-full overflow-x-hidden">
          <div className="g-effect absolute -top-[300px] -right-[300px] w-[1000px] h-[1000px] scale-50 lg:scale-100"></div>

          <div className="min-h-screen w-full  max-w-1440 mx-auto relative flex items-center">
            <div className="w-full h-full flex flex-col items-center justify-center px-16 py-36">
              <div className="w-full py-40 px-16 md:px-32 max-w-480  bg-white/5 rounded-16 flex flex-col gap-24 items-center">
                <Link href={"/"}>
                  <SvgLogo className="w-50 h-50" />
                </Link>
                <div>
                  <h4 className="g-button-text w-fit  mx-auto text-center ">{dictionaryInvitation.title[locale]}</h4>
                  <p className="text-gray-400 text-14 mt-8 text-center">
                    {dictionaryInvitation.subtitle1[locale]}{" "}
                    <span className="text-secondary-200">{inviteInfo?.businessName}</span>
                    {dictionaryInvitation.subtitle2[locale]}
                  </p>
                </div>

                {inviteInfo.isExpired ? (
                  <div className="text-error">{dictionaryInvitation.status.expired[locale]}</div>
                ) : inviteInfo.isCompleted ? (
                  <div className="text-success">{dictionaryInvitation.status.completed[locale]}</div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-24 mt-12 w-full">
                    <CustomInput
                      value={name.value}
                      onChange={(e) => setName({ error: "", value: e })}
                      icon="solar:user-outline"
                      placeholder={dictionaryInvitation.fields.agentName[locale]}
                      error={name.error}
                    />
                    <CustomInput
                      value={country.value}
                      onChange={(e) => setCountry({ error: "", value: e })}
                      icon="carbon:location"
                      placeholder={dictionaryInvitation.fields.country[locale]}
                      error={country.error}
                    />
                    <CustomInput
                      value={phone.value}
                      onChange={(e) => setPhone({ error: "", value: e })}
                      icon="radix-icons:mobile"
                      placeholder={dictionaryInvitation.fields.phone[locale]}
                      error={phone.error}
                    />
                    <CustomInput
                      value={email.value}
                      onChange={(e) => setEmail({ error: "", value: e })}
                      type="email"
                      icon="ic:round-alternate-email"
                      placeholder={dictionaryInvitation.fields.email[locale]}
                      error={email.error}
                      readonly={true}
                    />
                    <CustomInput
                      value={password.value}
                      onChange={(e) => setPassword({ error: "", value: e })}
                      type="password"
                      icon="solar:shield-keyhole-outline"
                      placeholder={dictionaryInvitation.fields.password[locale]}
                      error={password.error}
                    />
                    <CustomInput
                      value={passwordConfirm.value}
                      onChange={(e) => setPasswordConfirm({ error: "", value: e })}
                      type="password"
                      icon="solar:shield-keyhole-outline"
                      placeholder={dictionaryInvitation.fields.confirmPassword[locale]}
                      error={passwordConfirm.error}
                    />
                    <AnimatedSlideButton
                      className=" text-18 py-14 border border-secondary-300 rounded-full mt-16"
                      isSubmit={true}
                    >
                      {dictionaryInvitation.buttons.continue[locale]}
                    </AnimatedSlideButton>
                  </form>
                )}
                <div className="text-14 flex items-center text-input-text gap-8 p-12 rounded-6">
                  {LOCALES.map((item, i) => {
                    return (
                      <>
                        {i !== 0 && <hr className="rotate-90 w-16" />}
                        <div
                          className={`cursor-pointer ${
                            locale === item.code ? "text-secondary-400" : "hover:text-white"
                          }`}
                          onClick={() => dispatch(setLocale(item.code))}
                        >
                          {item.code}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AgentInvitationPage;
