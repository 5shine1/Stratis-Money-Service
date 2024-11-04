"use client";
import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";
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
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const result = await apiUserInfo();
      dispatch(
        setAuth({
          ...result,
          role:
            role === "Administrator"
              ? ROLES.ADMIN
              : Array.isArray(role) && role[0] === "Agent"
              ? ROLES.AGENT
              : role === "Compliance"
              ? ROLES.COMPLIANCE
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
    return () => {};
  }, []); //eslint-disable-line

  return <></>;
};
