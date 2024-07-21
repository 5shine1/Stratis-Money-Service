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
import { apiUserInfo } from "@/api/auth.api";
import { ROLES } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";

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
  const { email } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleGetAuth = async () => {
    try {
      const token = localStorage.getItem("stratis-auth-token");
      if (!token || (token && email)) return dispatch(setAuthLoading());
      const result = await apiUserInfo();
      dispatch(
        setAuth({
          ...result,
          role: result?.isAdmin ? ROLES.ADMIN : result?.isBusiness ? ROLES.BUSINESS : ROLES.GUEST,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setAuthLoading());
    }
  };

  useEffect(() => {
    handleGetAuth();
    return () => {};
  }, []); //eslint-disable-line

  return <></>;
};
