"use client";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { apiWithdrawHistory } from "@/api/payment.api";
import RequestWithdrawModal from "./components/RequestWithdrawModal";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setAuth } from "@/store/slices/auth.slice";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { apiUserInfo } from "@/api/auth.api";
import { formattedTime, shortenString } from "@/utils/string.utils";
import { ROLES } from "@/@types/common";
import { apiAdminWithdrawalStatus, apiAdminWithdrawHistory } from "@/api/admin.api";
import StatusChangeModal from "./components/StatusChangeModal";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { IWithdrawHistory } from "@/@types/data";
import { dictionaryGlobal, dictionaryPayment, dictionaryWithdraw } from "@/config/dictionary";
import IconBoxSm from "@/components/global/IconBoxSm";

const WithdrawPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const [withdrawHistory, setWithdrawHistory] = useState<IWithdrawHistory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(null);
  const { setLoading } = useContext(LoadingContext);
  const [url, setUrl] = useState("");
    
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []); 

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
      <title>Withdraw Funds - Stratis Money Service</title>
      {/* Open Graph Meta Tags */}
      <meta name="description" content="Easily withdraw your funds from Stratis Money Service with secure and fast transactions." />
      <meta property="og:title" content="Withdraw Funds - Stratis Money Service" />
      <meta property="og:description" content="Withdraw your funds securely and quickly from Stratis Money Service." />
      <meta property="og:url" content={`${url}/app/withdraw`} />
      <meta property="og:site_name" content="Withdraw Funds - Stratis Money Service" />
      <meta property="og:image" content={`${url}/assets/landing/meta-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Withdraw Funds - Stratis Money Service" />
      <meta name="twitter:description" content="Secure and fast fund withdrawal from Stratis Money Service." />
      <meta name="twitter:image" content={`${url}/assets/landing/meta-image.png`}  />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="675" />

      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">{dictionaryWithdraw.withdrawPage.headings.title[locale]}</h4>
        <div className="flex flex-col gap-32">
          {auth?.role === ROLES.BUSINESS && (
            <div className="bg-white/5 rounded-8 p-16 py-24 md:p-32 flex flex-col md:flex-row gap-32">
              <div className="flex flex-col gap-20">
                <div className="text-24 text-secondary-200 font-bold">
                  {dictionaryWithdraw.withdrawPage.headings.balances[locale]}
                </div>
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
                </div>
              </div>

              <button onClick={() => setIsRequestModalOpen(true)} className="ml-auto w-fit h-fit text-button-text font-semibold px-32 text-16 py-12 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50">
                {dictionaryWithdraw.withdrawPage.buttons.withdraw[locale]}
                <Icon icon={"mdi:cash-minus"} className="w-22 h-22 xs:hidden" />
              </button>
            </div>
          )}
          {isLoading ? (
            <div className="text-white/70 p-12 text-center">
              <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto hidden sm:block">
                <table className="w-full table-fixed min-w-800 text-white/70">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-8 py-16 text-left w-180 xl:w-320">
                        {dictionaryWithdraw.withdrawPage.tableHeaders.withdrawId[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-140">
                        {dictionaryWithdraw.withdrawPage.tableHeaders.amount[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-120">
                        {dictionaryWithdraw.withdrawPage.tableHeaders.fee[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-120">
                        {dictionaryWithdraw.withdrawPage.tableHeaders.status[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-160">
                        {dictionaryWithdraw.withdrawPage.tableHeaders.date[locale]}
                      </th>
                      {auth?.role === ROLES.ADMIN && (
                        <th className="px-8 py-16 text-right w-80">
                          {dictionaryWithdraw.withdrawPage.tableHeaders.date[locale]}
                        </th>
                      )}
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
                              <td className="px-8 py-16 flex items-center gap-8">
                                <span className="hidden xl:block">{item.withdrawalId}</span>
                                <span className="xl:hidden">{shortenString(item.withdrawalId, 8, 6)}</span>
                                <div className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(item.withdrawalId);
                                  toast.success(dictionaryPayment.toast.copied[locale]);
                                }}
                                >
                                  <IconBoxSm icon="ph:copy-light" />
                                </div>
                              </td>
                              <td className="px-8 py-16">
                                {item.amount} <span className="opacity-50">{item.currency}</span>
                              </td>
                              <td className="px-8 py-16">
                                {item.fee} <span className="opacity-50">{item.currency}</span>
                              </td>
                              <td className="px-8 py-16">
                                {item.status === 1 ? 
                                <span className="text-success">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>
                                : ( item.status === 2 ? <span className="text-error">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>: <span className="text-secondary-400">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>)}
                              </td>
                              <td className={`px-8 py-16`}>{formattedTime(item.requested, locale)}</td>
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
              <div className="text-white/70 sm:hidden flex flex-col gap-6">
              {!withdrawHistory.length ? (
                <div className="text-error p-24 text-center">No History</div>
              ) : (
                <>
                  {withdrawHistory.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                    return (
                      <div key={i} className="bg-[#ffffff04] p-12 flex flex-col gap-12 rounded-6">
                        <div className="flex justify-between items-center gap-50 overflow-hidden">
                          <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.withdrawId[locale]}</div>
                          <div className="u-text-overflow flex items-center gap-8">
                            <span className="hidden xl:block">{item.withdrawalId}</span>
                            <span className="xl:hidden">{shortenString(item.withdrawalId, 6, 4)}</span>
                            <div className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(item.withdrawalId);
                              toast.success(dictionaryPayment.toast.copied[locale]);
                            }}
                            >
                              <IconBoxSm icon="ph:copy-light" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-50 overflow-hidden">
                          <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.amount[locale]}</div>
                          <div className="u-text-overflow">
                            {item.amount} <span className="opacity-50">{item.currency}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-50 overflow-hidden">
                          <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.fee[locale]}</div>
                          <div className="u-text-overflow">
                            {item.fee} <span className="opacity-50">{item.currency}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-50 overflow-hidden">
                          <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.status[locale]}</div>
                          <div className="u-text-overflow">
                            {item.status === 1 ? 
                            <span className="text-success">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>
                            : ( item.status === 2 ? <span className="text-error">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>: <span className="text-secondary-400">{dictionaryGlobal.withdrawStatus[locale][item.status]}</span>)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-50 overflow-hidden">
                          <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.date[locale]}</div>
                          <div className="u-text-overflow">{formattedTime(item.requested, locale)}</div>
                        </div>
                        {auth?.role === ROLES.ADMIN && (
                          <div className="flex justify-between items-center gap-50 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryWithdraw.withdrawPage.tableHeaders.date[locale]}</div>
                            <div className="u-text-overflow">
                              <button
                                onClick={() => setIsStatusModalOpen(item)}
                                className="text-white/40 u-transition-color hover:text-info disabled:cursor-not-allowed disabled:hover:text-white/40"
                              >
                                <Icon icon="fluent:edit-settings-24-filled" className="w-18 h-18"></Icon>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              </div>
            </>
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
