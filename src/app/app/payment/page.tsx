"use client";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppCheckbox from "@/components/global/AppCheckbox";
import { callAPI, mockOrderLinks } from "@/config/mock";

const PaymentPage = () => {
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideCompleted, setIsHideCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await callAPI();
        setPaymentOrders(mockOrderLinks);
        toast.success("Data fetched successfully.");
      } catch (error) {
        toast.error("Server error.");
      }
    })();
    return () => {};
  }, []);

  const filteredData = useMemo(
    () =>
      paymentOrders
        .filter((item) => {
          return item.to.toUpperCase().includes(searchIndex.toUpperCase());
        })
        .filter((item) => {
          return !isHideCompleted || (isHideCompleted && item.status !== "Completed");
        }),
    [isHideCompleted, paymentOrders, searchIndex]
  );

  return (
    <div className="flex flex-col gap-48 p-48">
      <h2 className="w-fit">Payment Orders</h2>
      <div className="flex flex-col gap-32">
        <div className="flex items-center gap-32">
          <div className="w-full max-w-320">
            <AppInput
              value={searchIndex}
              onChange={setSearchIndex}
              icon="ic:outline-search"
              placeholder="Search by payer name"
            ></AppInput>
          </div>
          <AppCheckbox
            value={isHideCompleted}
            onChange={setIsHideCompleted}
            label="Hide Completed Transactions"
          ></AppCheckbox>
          <AnimatedSlideButton
            onClick={() => {}}
            className=" text-16 py-12 px-32 border border-secondary-300 rounded-full ml-auto"
          >
            Generate New
          </AnimatedSlideButton>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed min-w-800">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-8 py-16 text-left w-160">Payment ID</th>
                <th className="px-8 py-16 text-left w-160">Payment Link</th>
                <th className="px-8 py-16 text-left w-120">From</th>
                <th className="px-8 py-16 text-left w-120">To</th>
                <th className="px-8 py-16 text-left w-120">Amount</th>
                <th className="px-8 py-16 text-left w-140">Status</th>
                <th className="px-8 py-16 text-left w-180">Date</th>
                <th className="px-8 py-16 text-right w-120">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!filteredData.length ? (
                <tr>
                  <td colSpan={8} className="text-error p-24 text-center">
                    No Order Links
                  </td>
                </tr>
              ) : (
                <>
                  {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                    return (
                      <tr key={i} className="even:bg-[#ffffff04]">
                        <td className="px-8 py-16">{item.id}</td>
                        <td className="px-8 py-16">{item.link}</td>
                        <td className="px-8 py-16">{item.from}</td>
                        <td className="px-8 py-16">{item.to}</td>
                        <td className="px-8 py-16">
                          {item.amount} <span className="text-white/50">{item.currency.name}</span>
                        </td>
                        <td className={`px-8 py-16 ${item.status === "Completed" ? "text-success" : "text-info"}`}>
                          {item.status}
                        </td>
                        <td className={`px-8 py-16 ${item.status === "Completed" ? "text-success" : "text-white"}`}>
                          {item.date}
                        </td>
                        <td className="">
                          <div className="flex items-center gap-4 justify-end">
                            <button className="p-6 rounded-4 text-info border border-info bg-transparent u-transition-color hover:bg-info hover:text-blue-800">
                              <Icon icon="ph:eye" className="w-20 h-20"></Icon>
                            </button>
                            <button className="p-6 rounded-4 text-success border border-success bg-transparent u-transition-color hover:bg-success hover:text-green-900">
                              <Icon icon="mage:edit" className="w-20 h-20"></Icon>
                            </button>
                            <button className="p-6 rounded-4 text-error border border-error bg-transparent u-transition-color hover:bg-error hover:text-white">
                              <Icon icon="ph:trash" className="w-20 h-20"></Icon>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            total={filteredData.length}
            hideOnSinglePage={true}
            className="flex items-center gap-8 text-14"
            prevIcon={<Icon icon="icon-park-outline:left" />}
            nextIcon={<Icon icon="icon-park-outline:right" />}
            showLessItems
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
