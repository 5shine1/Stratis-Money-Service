"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { callAPI } from "@/config/mock";

const OrderDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      <h4 className="w-fit g-header-app">Transaction Detail</h4>

      {isLoading ? (
        <div className="text-primary-200 dark:text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Summary</div>
            <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Transaction ID</span>
                3fa85f64-5717-4562-b3fc-2c963f66afa6
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Payment Link</span>
                https://stratisplatform.payment.com/detail/3fa85f64-5717-4562-b3fc-2c963f66afa6
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Status</span>In Prograss
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Created At</span>
                05/24/2024 12:00:32
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all text-error">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200 ">Completed At</span>
                N/A
              </div>
            </div>
          </div>

          <div className="flex gap-16 flex-col xl:flex-row">
            <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
              <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> From</div>
              <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Name</span>
                  John Doe{" "}
                </div>
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Emailk</span>
                  johndoe@stratis.com
                </div>
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Phone number</span>
                  +12737713322
                </div>
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Address</span>
                  United States
                </div>
                <div className="flex gap-4 flex-col sm:flex-row break-all text-error">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Member from</span>
                  Not Registered
                </div>
              </div>
            </div>
            <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
              <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> To</div>
              <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Name</span>
                  Jahn Doe
                </div>
                <div className="flex gap-4 flex-col sm:flex-row break-all">
                  <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Emailk</span>
                  jahndoe@stratis.com
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
                  02/23/2024
                </div>
              </div>
            </div>
          </div>

          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Description</div>
            <div className=" mt-18 text-primary-200 dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex, laborum explicabo placeat deleniti unde
              saepe nam delectus quod aliquam vero neque fugit? Facere corporis dolores optio, deserunt repellendus
              eius.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
