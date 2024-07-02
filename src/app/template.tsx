"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { store } from "@/store";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import LoadingProvider from "@/components/providers/LoadingProvider";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setAuth, setAuthLoading } from "@/store/slices/auth.slice";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiUserInfo } from "@/api/auth.api";
import { ROLES } from "@/@types/common";

const RootTemplate = ({ children }: PropsWithChildren) => {
  Modal.setAppElement("body");
  return (
    <>
      <Provider store={store}>
        <ScrollProvider>
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
        </ScrollProvider>
      </Provider>
    </>
  );
};

export default RootTemplate;

const MainComponent = () => {
  const dispatch = useAppDispatch();

  const handleGetAuth = async () => {
    try {
      const token = localStorage.getItem("stratis-auth-token");
      if (!token) return dispatch(setAuthLoading());
      const result = await apiUserInfo();
      dispatch(
        setAuth({
          ...result,
          accessToken: token,
          role: result && result.isBusiness ? (result.isBusiness === true ? ROLES.BUSINESS : ROLES.ADMIN) : ROLES.GUEST,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAuth();
    return () => {};
  }, []);

  return <></>;
};
