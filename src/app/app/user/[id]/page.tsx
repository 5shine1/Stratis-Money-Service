"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { callAPI, mockOrderLinks } from "@/config/mock";

const OrderPage = () => {
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      await callAPI();
      setPaymentOrders(mockOrderLinks);
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
      <h4 className="w-fit g-header-app">User Detail</h4>

      {isLoading ? (
        <div className="text-primary-200 dark:text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : (
        <div className="flex flex-col gap-32">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full md:max-w-420">
              <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> User Detail</div>
              <div className="flex flex-col gap-12 mt-18 text-primary-200 dark:text-white">
                <span>
                  <span className="opacity-60">Name: </span>John Doe{" "}
                  <span className="text-success border  px-4 py-2 border-success rounded-4 text-12">Admin</span>
                </span>
                <span>
                  <span className="opacity-60">Email: </span>johndoe@stratis.com
                </span>
                <span>
                  <span className="opacity-60">Phone: </span>+12737713322
                </span>
                <span>
                  <span className="opacity-60">Location: </span>United States
                </span>
                <span>
                  <span className="opacity-60">Member from: </span>02/23/2024
                </span>
              </div>
            </div>
            <div className="p-32 rounded-8 bg-secondary-100/20 dark:bg-white/5 w-full md:max-w-420">
              <div className="text-20 font-bold text-primary-200 dark:text-secondary-200"> Balances</div>
              <div className="flex flex-col gap-16 mt-18 text-primary-200 dark:text-white">
                <div className="flex  items-center gap-8">
                  <Icon icon={"cryptocurrency-color:usd"} className="w-24 h-24" />
                  <span>
                    1,323 <span className="opacity-50">USD</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:eur"} className="w-24 h-24" />
                  <span>
                    1,323 <span className="opacity-50">EUR</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:gbp"} className="w-24 h-24" />
                  <span>
                    1,323 <span className="opacity-50">GBP</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed min-w-800 text-primary-200 dark:text-white/70">
              <thead>
                <tr className="border-b border-primary-200/20 dark:border-white/10">
                  <th className="px-8 py-16 text-left w-160">Payment ID</th>
                  <th className="px-8 py-16 text-left w-160">Payment Link</th>
                  <th className="px-8 py-16 text-left w-120">From</th>
                  <th className="px-8 py-16 text-left w-120">To</th>
                  <th className="px-8 py-16 text-left w-120">Amount</th>
                  <th className="px-8 py-16 text-left w-120">Status</th>
                  <th className="px-8 py-16 text-left w-160">Date</th>
                </tr>
              </thead>
              <tbody>
                {![paymentOrders].length ? (
                  <tr>
                    <td colSpan={7} className="text-error p-24 lg:text-center text-left">
                      No History
                    </td>
                  </tr>
                ) : (
                  <>
                    {paymentOrders.map((item, i) => {
                      return (
                        <tr key={i} className="even:bg-secondary-100/10 dark:even:bg-[#ffffff04]">
                          <td className="px-8 py-16">{item.id}</td>
                          <td className="px-8 py-16">{item.link}</td>
                          <td className="px-8 py-16">{item.from}</td>
                          <td className="px-8 py-16">{item.to}</td>
                          <td className="px-8 py-16">
                            {item.amount} <span className="text-white/30">{item.currency.name}</span>
                          </td>
                          <td className={`px-8 py-16 ${item.status === "Completed" ? "text-success" : ""}`}>
                            {item.status}
                          </td>
                          <td className={`px-8 py-16 `}>{item.date}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
