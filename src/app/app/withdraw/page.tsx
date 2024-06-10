"use client";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { callAPI, mockOrderLinks } from "@/config/mock";

const WithdrawPage = () => {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(
    () =>
      withdrawHistory.filter((item) => {
        return item.to.toUpperCase().includes(searchIndex.toUpperCase());
      }),
    [withdrawHistory, searchIndex]
  );

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      await callAPI();
      setWithdrawHistory(mockOrderLinks);
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
    <div className="flex flex-col gap-24 lg:gap-48 lg:p-48 py-32 p-8 text-14">
      <h2 className="w-fit">Withdraw</h2>
      <div className="flex flex-col gap-32">
        <div className="bg-white/5 rounded-8 p-16 py-24 md:p-32">
          <div className="text-24 text-secondary-200 font-bold mb-16 md:mb-0">My Balances</div>
          <div className="flex flex-col md:flex-row md:items-end gap-16 md:gap-24 text-16 md:text-18">
            <div className="font bold flex  items-center gap-8">
              <Icon icon={"cryptocurrency-color:usd"} className="w-24 h-24" />
              <span>
                1,323 <span className="text-white/50">USD</span>
              </span>
            </div>
            <div className="font bold flex items-center gap-8">
              <Icon icon={"cryptocurrency-color:eur"} className="w-24 h-24" />
              <span>
                1,323 <span className="text-white/50">EUR</span>
              </span>
            </div>
            <div className="font bold flex items-center gap-8">
              <Icon icon={"cryptocurrency-color:gbp"} className="w-24 h-24" />
              <span>
                1,323 <span className="text-white/50">GBP</span>
              </span>
            </div>

            <AnimatedSlideButton
              onClick={() => {}}
              className=" text-16 py-12 px-32 border border-secondary-300 rounded-full md:ml-auto mt-16 md:mt-0"
            >
              Withdraw
            </AnimatedSlideButton>
          </div>
        </div>
        {isLoading ? (
          <div className="text-white/70 p-12 text-center">
            <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed min-w-800 text-white/70">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-8 py-16 text-left w-320">Withdraw ID</th>
                  <th className="px-8 py-16 text-left w-100">From</th>
                  <th className="px-8 py-16 text-left w-100">To</th>
                  <th className="px-8 py-16 text-left w-120">Amount</th>
                  <th className="px-8 py-16 text-left w-160">Date</th>
                </tr>
              </thead>
              <tbody>
                {!filteredData.length ? (
                  <tr>
                    <td colSpan={8} className="text-error p-24 lg:text-center text-left">
                      No Order Links
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <tr key={i} className="even:bg-[#ffffff04]">
                          <td className="px-8 py-16">{item.id}</td>
                          <td className="px-8 py-16">Stratis</td>
                          <td className="px-8 py-16">Me</td>
                          <td className="px-8 py-16">
                            {item.amount} <span className="text-white/30">{item.currency.name}</span>
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
        )}
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

export default WithdrawPage;
