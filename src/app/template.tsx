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
  const { email } = useAppSelector((state) => state.auth);

  const handleGetAuth = async () => {
    try {
      if (email) return dispatch(setAuthLoading());
      const session = localStorage.getItem("stratis-auth");
      if (session === null) return dispatch(setAuthLoading());
      const auth = JSON.parse(session);
      if (!auth || !auth.accessToken || !auth.refreshToken) return;
      dispatch(setAuth(auth));
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
