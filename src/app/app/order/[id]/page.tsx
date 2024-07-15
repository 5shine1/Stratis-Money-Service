"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { IPayment } from "@/@types/data";
import { apiPaymentHistoryDetail } from "@/api/payment.api";
import { PAYMENT_STATE } from "@/@types/common";
import { formattedTime } from "@/utils/string.utils";

type Props = {
  params: {
    id: string;
  };
};
const OrderDetailPage: React.FC<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const id = params.id;

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      const result = await apiPaymentHistoryDetail(id);
      setPayment(result);
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, [id]);

  return (
    <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
      <h4 className="w-fit g-header-app">Transaction Detail</h4>

      {isLoading ? (
        <div className="text-primary-200 dark:text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : payment ? (
        <div className="flex flex-col gap-16">
          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Summary</div>
            <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Transaction ID</span>
                {payment?.paymentId}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Payment Link</span>
                {window.location.origin}/payment/{payment?.paymentId}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Status</span>
                {PAYMENT_STATE[payment?.state] || "Error"}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Payer</span>
                {payment?.payer}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Amount</span>
                <span>
                  {payment?.amount} <span className="opacity-60">{payment?.currency}</span>
                </span>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200">Created At</span>
                <span>
                  {payment?.requested?.replace("T", " ").split(".")[0]}
                  &nbsp;&nbsp;&nbsp;
                  <span className="opacity-60">{formattedTime(payment?.requested)}</span>
                </span>
              </div>
              {/* <div className="flex gap-4 flex-col sm:flex-row break-all text-error">
                <span className="opacity-60 text-primary-200 dark:text-white flex-none w-200 ">Completed At</span>
                N/A
              </div> */}
            </div>
          </div>

          {/* <div className="flex gap-16 flex-col xl:flex-row">
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
          </div> */}

          <div className="p-24 md:p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full">
            <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Description</div>
            <div className=" mt-18 text-primary-200 dark:text-white">{payment?.description}</div>
          </div>
        </div>
      ) : (
        <div className="text-primary-200 dark:text-white/70">Something went wrong. Please check the link again.</div>
      )}
    </div>
  );
};

export default OrderDetailPage;
