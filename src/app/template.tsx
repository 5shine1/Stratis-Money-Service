"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";
import { store } from "@/store";
import LoadingProvider from "@/components/providers/LoadingProvider";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setAuth, setAuthLoading } from "@/store/slices/auth.slice";
import { apiUserInfo } from "@/api/auth.api";
import { ROLES } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setLocale } from "@/store/slices/locale.slice";
import Head from "next/head";

const RootTemplate = ({ children }: PropsWithChildren) => {
  Modal.setAppElement("body");
  return (
    <>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            className: "!bg-primary-500 !text-gray-200",
            duration: 5000,
          }}
        />
        <LoadingProvider>
          <MainComponent />
          {children}
        </LoadingProvider>
      </Provider>
    </>
  );
};

export default RootTemplate;

const MainComponent = () => {
  const { email, role: roleRedux } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleGetAuth = async () => {
    try {
      if (roleRedux === ROLES.ADMIN || roleRedux === ROLES.COMPLIANCE) dispatch(setLocale("EN"));
      const token = localStorage.getItem("stratis-auth-token");
      if (!token || (token && email)) return dispatch(setAuthLoading());
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const result = await apiUserInfo();
      dispatch(
        setAuth({
          ...result,
          role:
            role === "Administrator"
              ? ROLES.ADMIN
              : role === "Agent"
                ? ROLES.AGENT
                : role === "Compliance"
                  ? ROLES.COMPLIANCE
                  : role === "BusinessAdmin"
                    ? ROLES.BUSINESS
                    : decoded["UserName"] && !role
                      ? ROLES.BUSINESS
                      : ROLES.GUEST,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setAuthLoading());
    }
  };

  useEffect(() => {
    handleGetAuth();
    return () => { };
  }, []); //eslint-disable-line

  return (
  <Head>
    <title>Stratis Money Service</title>

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index,follow" />
    <meta name="description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world." />
    <meta name="twitter:image" content="/assets/landing/meta-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Stratis Money Service" />
    <meta name="twitter:description" content="Stratis Crypto Payment Gateway Platform" />

    <meta property="og:title" content="Stratis Money Service" />
    <meta property="og:description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world." />

    <meta property="og:type" content="website" />
    <meta property="og:image" content="/assets/landing/meta-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="600" />
    <meta property="og:locale" content="en" />

    <meta name="description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world." />
  </Head>)
};
