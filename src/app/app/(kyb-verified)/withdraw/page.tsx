"use client";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { apiWithdrawHistory } from "@/api/payment.api";
import RequestWithdrawModal from "./components/RequestWithdrawModal";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setAuth } from "@/store/slices/auth.slice";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { apiUserInfo } from "@/api/auth.api";
import { formattedTime } from "@/utils/string.utils";
import { ROLES, WITHDRAW_STATE } from "@/@types/common";
import { apiAdminWithdrawalStatus, apiAdminWithdrawHistory } from "@/api/admin.api";
import StatusChangeModal from "./components/StatusChangeModal";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { IWithdrawHistory } from "@/@types/data";

const WithdrawPage = () => {
  const [withdrawHistory, setWithdrawHistory] = useState<IWithdrawHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(null);
  const { setLoading } = useContext(LoadingContext);

  const handleGetBalance = async () => {
    try {
      const result = await apiUserInfo();
      dispatch(
        setAuth({
          ...auth,
          totalBalance: result?.totalBalance,
        })
      );
    } catch (error) {}
  };

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      if (auth?.role === ROLES.BUSINESS) {
        const result = await apiWithdrawHistory();
        setWithdrawHistory(result);
      }
      if (auth?.role === ROLES.ADMIN) {
        const result = await apiAdminWithdrawHistory();
        setWithdrawHistory(result);
      }
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  const handleChangeStatus = async (id: string, status: number) => {
    setLoading(true);
    try {
      await apiAdminWithdrawalStatus(id, status);
      toast.success("Status changed successfully.");
      setWithdrawHistory(
        withdrawHistory.map((item) => {
          if (item.withdrawalId === id) return { ...item, status };
          return item;
        })
      );
    } catch (error) {
      toast.error("Server error.");
    }
    setIsStatusModalOpen(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetBalance();
    handleGetOrders();
    return () => {};
  }, []); //eslint-disable-line

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">Withdraw</h4>
        <div className="flex flex-col gap-32">
          {auth?.role === ROLES.BUSINESS && (
            <div className="bg-white/5 rounded-8 p-16 py-24 md:p-32">
              <div className="text-24 text-secondary-200 font-bold mb-16 md:mb-0">My Balances</div>
              <div className="flex flex-col md:flex-row md:items-end gap-16 md:gap-32 text-14 text-white">
                <div className="flex  items-center gap-8">
                  <Icon icon={"cryptocurrency-color:usd"} className="w-24 h-24" />
                  <span>
                    {auth?.totalBalance?.USD || 0} <span className="opacity-50">USD</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:eur"} className="w-24 h-24" />
                  <span>
                    {auth?.totalBalance?.EUR || 0} <span className="opacity-50">EUR</span>
                  </span>
                </div>

                <AnimatedSlideButton
                  onClick={() => {
                    setIsRequestModalOpen(true);
                  }}
                  className="text-white text-16 py-12 px-32 border border-secondary-300 rounded-full md:ml-auto mt-16 md:mt-0"
                  backClassName="from-primary-400 to-secondary-300 "
                >
                  Withdraw
                </AnimatedSlideButton>
              </div>
            </div>
          )}
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
                    <th className="px-8 py-16 text-left w-140">Amount</th>
                    <th className="px-8 py-16 text-left w-120">Fee</th>
                    <th className="px-8 py-16 text-left w-120">Status</th>
                    <th className="px-8 py-16 text-left w-160">Date</th>
                    {auth?.role === ROLES.ADMIN && <th className="px-8 py-16 text-right w-80">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {!withdrawHistory.length ? (
                    <tr>
                      <td colSpan={5} className="text-error p-24 lg:text-center text-left">
                        No History
                      </td>
                    </tr>
                  ) : (
                    <>
                      {withdrawHistory.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                        return (
                          <tr key={i} className="even:bg-[#ffffff04]">
                            <td className="px-8 py-16">{item.withdrawalId}</td>
                            <td className="px-8 py-16">
                              {item.amount} <span className="opacity-50">{item.currency}</span>
                            </td>
                            <td className="px-8 py-16">
                              {item.fee} <span className="opacity-50">{item.currency}</span>
                            </td>
                            <td className="px-8 py-16">{WITHDRAW_STATE[item.status]}</td>
                            <td className={`px-8 py-16`}>{formattedTime(item.requested)}</td>
                            {auth?.role === ROLES.ADMIN && (
                              <td className="px-8 py-16 text-right">
                                <button
                                  onClick={() => setIsStatusModalOpen(item)}
                                  className="text-white/40 u-transition-color hover:text-info disabled:cursor-not-allowed disabled:hover:text-white/40"
                                >
                                  <Icon icon="fluent:edit-settings-24-filled" className="w-18 h-18"></Icon>
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            total={withdrawHistory.length}
            hideOnSinglePage={true}
            className="flex items-center gap-8 text-14"
            prevIcon={<Icon icon="icon-park-outline:left" />}
            nextIcon={<Icon icon="icon-park-outline:right" />}
            showLessItems
            showTitle={false}
          />
        </div>
      </div>
      <RequestWithdrawModal
        isOpen={isRequestModalOpen}
        onClose={async () => {
          setIsRequestModalOpen(false);
          try {
            const result = await apiWithdrawHistory();
            setWithdrawHistory(result);
          } catch (error) {}
        }}
      />
      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(null)}
        onNext={handleChangeStatus}
      />
    </>
  );
};

export default WithdrawPage;
