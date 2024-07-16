"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { callAPI } from "@/config/mock";
import CustomSwitch from "@/components/global/CustomSwitch";
import useAppSelector from "@/hooks/global/useAppSelector";

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isKycAsk, setIsKycAsk] = useState(true);
  const { userId, name, role, email } = useAppSelector((state) => state.auth);

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      await callAPI();
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
      <h4 className="w-fit g-header-app">My Account</h4>

      {isLoading ? (
        <div className="text-primary-200 dark:text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Profile</div>
            <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">User ID</span>
                {userId}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Email</span>
                {email}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all text-success">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Role</span>
                {role}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Name</span>
                {name}
              </div>

              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Phone number</span>
                +12737713322
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Address</span>
                United States
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Member from</span>
                05/09/2024
              </div>
            </div>
          </div>

          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Setting</div>
            <div className="flex md:items-center gap-12 md:gap-32 mt-18 flex-col md:flex-row items-start">
              <div className=" text-primary-200 dark:text-white">
                <span>Accept non-stable coin for payment </span>
                <Icon icon="fe:question" className="text-info w-17 h-17 mb-1 cursor-pointer inline" />
              </div>
              <div className="flex items-center gap-6 text-12 dark:text-white text-primary-200">
                OFF
                <CustomSwitch
                  value={isKycAsk}
                  onChange={() => {
                    setIsKycAsk(!isKycAsk);
                  }}
                />
                ON
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
