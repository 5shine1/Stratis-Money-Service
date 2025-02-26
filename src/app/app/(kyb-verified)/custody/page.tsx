"use client";
import React, { useEffect, useMemo, useState } from "react";
// import NoWallet from "./components/NoWallet";
import useAppSelector from "@/hooks/global/useAppSelector";
import { ROLES } from "@/@types/common";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pagination from "rc-pagination";
import ConnectModal from "./components/ConnectModal";
import Link from "next/link";
import WithdrawModal from "./components/WithdrawModal";

import { acceptableCurrencies, history } from "./deposit/data";
import { formattedTime } from "@/utils/string.utils";

const CustodyPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const { role } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const filteredData = useMemo(
    () => history.sort((a, b) => new Date(b.requested).getTime() - new Date(a.requested).getTime()),
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState<{
    amount: string;
    recipient: string;
    nonce: number;
    chainId: number;
  } | null>(null);
  const [currencies, setCurrencies] = useState([]);

  // Mock withdrawal data for testing
  const handleWithdraw = () => {
    setWithdrawalData({
      amount: "0.1",
      recipient: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      nonce: 1,
      chainId: 1,
    });
    setShowModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    setCurrencies(
      acceptableCurrencies
        .filter((item, index, self) => index === self.findIndex((t) => t.symbol === item.symbol))
        .map((item) => ({ symbol: item.symbol, icon: item.icon, amount: Math.random() * 100 }))
    );
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
      <h4 className="w-fit g-header-app">Custody</h4>
      <div className="flex flex-col gap-32">
        {role === ROLES.BUSINESS && (
          <div className="bg-white/5 rounded-8 p-16 py-24 md:p-32">
            <div className="flex">
              <div className="flex flex-col gap-6">
                <div className="text-24 text-secondary-200 font-bold mb-16 md:mb-0">Account</div>
                <div>0xd58eEd66d22160A8a49a16186e79A123EF5ce5E4</div>
              </div>
              <div className="ml-auto hidden md:flex">
                <Link href="/app/custody/deposit">
                  <button className="w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 xs:px-24">
                    Deposit
                    <Icon icon={"mdi:cash-plus"} className="w-22 h-22 xs:hidden" />
                  </button>
                </Link>
                <button
                  onClick={() => setWithdrawModal(true)}
                  className="ml-20 w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 xs:px-24"
                >
                  Withdraw
                  <Icon icon={"mdi:cash-minus"} className="w-22 h-22 xs:hidden" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6 ">
              <div className="text-24 text-secondary-200 font-bold mt-12 mb-16 md:mb-0">Balance</div>
              <div className="flex md:items-center gap-16 md:gap-32 text-14 text-white flex-wrap">
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:usd"} className="w-24 h-24" />
                  <span>
                    283.22 <span className="opacity-50">USD</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:eur"} className="w-24 h-24" />
                  <span>
                    31.00 <span className="opacity-50">EUR</span>
                  </span>
                </div>
                {currencies.map((currency, i) => (
                  <div key={i} className="flex items-center gap-8">
                    <img className="w-24 h-24 rounded-full" src={currency.icon} alt="" />
                    <span>
                      {currency.amount.toFixed(2)} <span className="opacity-50">{currency.symbol}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-30 md:hidden">
              <Link href="/app/custody/deposit">
                <button className="w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 xs:px-24">
                  Deposit
                  <Icon icon={"mdi:cash-plus"} className="w-22 h-22 xs:hidden" />
                </button>
              </Link>
              <button
                onClick={() => setWithdrawModal(true)}
                className="ml-20 w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 xs:px-24"
              >
                Withdraw
                <Icon icon={"mdi:cash-minus"} className="w-22 h-22 xs:hidden" />
              </button>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="text-white/70 p-12 text-center">
            <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto hidden sm:block">
              <table className="w-full text-white/70">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-8 py-16 text-left w-200">Type</th>
                    <th className="px-8 py-16 text-left w-160">Amount</th>
                    <th className="px-8 py-16 text-left w-160">Status</th>
                    <th className="px-8 py-16 text-left w-160">Timestamp</th>
                    <th className="px-8 py-16 text-left w-120">Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  {!filteredData.length ? (
                    <tr>
                      <td colSpan={7} className="text-error p-24 text-center">
                        No History
                      </td>
                    </tr>
                  ) : (
                    <>
                      {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                        return (
                          <tr key={i} className="odd:bg-[#ffffff04] text-xs">
                            <td className="px-8 py-16">
                              {item.type ? (
                                <span className="flex justify-center w-80 bg-teal-400/20 text-teal-400 border border-teal-400 font-semibold py-6 rounded-4">
                                  Deposit
                                </span>
                              ) : (
                                <span className="flex justify-center w-80 bg-orange-400/20 text-orange-400 border border-orange-400 font-semibold py-6 rounded-4">
                                  Withdraw
                                </span>
                              )}
                            </td>
                            <td className="px-8 py-16">
                              {item.amount} <span className="opacity-50">{item.currency}</span>
                            </td>
                            <td className="px-8 py-16">
                              {item.status === 200 ? (
                                <span className="text-success">Confirmed</span>
                              ) : item.status === 60 ? (
                                <span className="text-secondary-400">Pending</span>
                              ) : (
                                <span className="text-error">Failed</span>
                              )}
                            </td>
                            <td className="px-8 py-16">{formattedTime(item.requested, locale)}</td>
                            <td className="px-8 py-16"></td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
        {role !== ROLES.BUSINESS && (
          <button
            className="m-auto w-fit font-semibold p-16 text-12 py-8  rounded-8 gap-8 flex items-center justify-center border border-button-border from-button-from/10 to-button-to/10"
            onClick={() => setShowModal(true)}
          >
            Withdraw through Ledger
            <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16" />
          </button>
        )}
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
        <button
          onClick={handleWithdraw}
          className="ml-auto w-fit text-button-text font-semibold p-32 text-16 py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
        >
          Withdraw using Ledger
          <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16 ml-8" />
        </button>
        <ConnectModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setWithdrawalData(null);
          }}
          withdrawalData={withdrawalData}
        />
        <WithdrawModal
          isOpen={withdrawModal}
          onClose={() => setWithdrawModal(false)}
          availableCurrencies={currencies}
        />
      </div>
    </div>
  );
};

export default CustodyPage;
