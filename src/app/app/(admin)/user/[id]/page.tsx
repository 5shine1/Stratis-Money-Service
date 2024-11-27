"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { apiActivateUser, apiAdminPaymentHistoryByUser, apiAdminUserDetail } from "@/api/admin.api";
import { IUser } from "@/@types/data";
import Link from "next/link";
import { formattedTime } from "@/utils/string.utils";
import { PAYMENT_STATE } from "@/@types/common";
import Pagination from "rc-pagination/lib/Pagination";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { LoadingContext } from "@/components/providers/LoadingProvider";

type Props = {
  params: {
    id: string;
  };
};

const UserDetailPage: React.FC<Props> = ({ params }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageAgent, setCurrentPageAgent] = useState(1);
  const { setLoading } = useContext(LoadingContext);
  const id = params.id;

  const filteredData = useMemo(
    () =>
      userInfo?.agents.sort((a, b) => {
        return Number(a.isDeleted) - Number(b.isDeleted);
      }),
    [userInfo?.agents]
  );

  const handleGetUser = async () => {
    setIsLoading(true);
    try {
      const result = await apiAdminUserDetail(id);
      setUserInfo(result);
      const payments = await apiAdminPaymentHistoryByUser(id);
      setPaymentOrders(payments);
    } catch (error) {
      console.log(error);
      toast.error("Server error.");
    }
    setIsLoading(false);
  };
  const handleActiveUser = async () => {
    setLoading(true);
    const userId = userInfo.userId;
    const status = !userInfo.isKnowYourBusinessPassed;
    try {
      await apiActivateUser(userId, status);
      setUserInfo({ ...userInfo, isKnowYourBusinessPassed: status });
      toast.success(`${status ? "Approved" : "Disapproved"} successfully.`);
    } catch (error) {
      toast.error("Server error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUser();
    return () => {};
  }, [id]); // eslint-disable-line

  return (
    <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
      <h4 className="w-fit g-header-app">Company Detail</h4>

      {isLoading ? (
        <div className="text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : userInfo ? (
        <div className="flex flex-col gap-32">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
              <div className="text-20 font-bold text-secondary-200"> Summary</div>
              <div className="flex flex-col gap-12 mt-18 text-white">
                <span>
                  <span className="opacity-60">Name: </span>
                  {userInfo.name}{" "}
                  <span
                    className={`border  px-4 py-2  rounded-4 text-12 ${
                      userInfo.isAdmin ? "text-info border-info" : "border-success text-success"
                    }`}
                  >
                    {userInfo?.role || "Business"}
                  </span>
                </span>
                <span>
                  <span className="opacity-60">Email: </span>
                  {userInfo.email}
                </span>
                <span>
                  <span className="opacity-60">Phone: </span>
                  {userInfo.mobileNumber}
                </span>
                <span>
                  <span className="opacity-60">Location: </span>
                  {userInfo.country}
                </span>
                <span>
                  <span className="opacity-60">Industry: </span>
                  {userInfo.industry}
                </span>
                <span>
                  <span className="opacity-60">Activity: </span>
                  {userInfo.activity}
                </span>
                <span>
                  <span className="opacity-60">Volume: </span>
                  {userInfo.volume}
                </span>
              </div>
            </div>
            <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
              <div className="text-20 font-bold text-secondary-200"> Balances</div>
              <div className="flex flex-col gap-16 mt-18 text-white">
                <div className="flex  items-center gap-8">
                  <Icon icon={"cryptocurrency-color:usd"} className="w-24 h-24" />
                  <span>
                    {userInfo.totalBalance?.USD} <span className="opacity-50">USD</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <Icon icon={"cryptocurrency-color:eur"} className="w-24 h-24" />
                  <span>
                    {userInfo.totalBalance?.EUR} <span className="opacity-50">EUR</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-16 mt-18 text-white">
                <span>
                  <span className="opacity-60">Total Transactions: </span>
                  {userInfo.transactionCount} Transactions
                </span>
                <span>
                  <span className="opacity-60">Total Volume: </span>
                  {userInfo.transactionVolume.USD} USD / {userInfo.transactionVolume.EUR} EUR
                </span>
              </div>
            </div>
            <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
              <div className="text-20 font-bold text-secondary-200"> Verification</div>
              <div className="flex flex-col gap-16 mt-18 text-white">
                <span>
                  <span className="opacity-60">Email Verification: </span>
                  <span className={`${userInfo.isVerifiedEmail ? "text-success" : "text-error"}`}>
                    {userInfo.isVerifiedEmail ? "Verified" : "Not Verified"}
                  </span>
                </span>
                <span>
                  <span className="opacity-60">KYB State: </span>
                  <span className={`${userInfo.isKnowYourBusinessCompleted ? "text-success" : "text-error"}`}>
                    {userInfo.isKnowYourBusinessCompleted ? "Verified" : "Not Verified"}
                  </span>
                </span>
                <span>
                  <span className="opacity-60">Compliance State: </span>
                  <span className={`${userInfo.isKnowYourBusinessPassed ? "text-success" : "text-error"}`}>
                    {userInfo.isKnowYourBusinessPassed ? "Verified" : "Not Verified"}
                  </span>
                </span>
                <AnimatedSlideButton
                  onClick={() => {
                    handleActiveUser();
                  }}
                  className=" w-fit text-white text-14 font-normal py-12 px-24 border border-secondary-300 rounded-full"
                  backClassName="from-primary-400 to-secondary-300 "
                >
                  {userInfo.isKnowYourBusinessPassed ? "Disapprove Compliance" : "Approve Compliance"}
                </AnimatedSlideButton>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="text-20 font-bold text-secondary-200"> Agents</div>
            <table className="w-full text-white/70">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-8 py-16 text-left w-200">Name</th>
                  <th className="px-8 py-16 text-left w-160">Email</th>
                  <th className="px-8 py-16 text-left w-160">Location</th>
                  <th className="px-8 py-16 text-left w-160">Phone</th>
                  <th className="px-8 py-16 text-left w-60"></th>
                </tr>
              </thead>
              <tbody>
                {!filteredData.length ? (
                  <tr>
                    <td colSpan={4} className="text-error p-24 text-center">
                      No Agents
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <tr key={i} className={`even:bg-[#ffffff04] ${item.isDeleted ? "text-white/30" : ""}`}>
                          <td className="px-8 py-16">{item.name}</td>
                          <td className="px-8 py-16">{item.email}</td>
                          <td className="px-8 py-16">{item.country}</td>
                          <td className="px-8 py-16">{item.mobileNumber}</td>
                          <td className="px-8 py-16 text-right">
                            {item.isDeleted ? (
                              <button
                                // onClick={() => setActiveModalOpen(item.agentId)}
                                className="text-white/40 u-transition-color hover:text-info disabled:cursor-not-allowed disabled:hover:text-white/40"
                              >
                                <Icon icon="mdi:restore-clock" className="w-20 h-20"></Icon>
                              </button>
                            ) : (
                              <button
                                // onClick={() => setDeleteModalOpen(item.agentId)}
                                className="text-white/40 u-transition-color hover:text-error disabled:cursor-not-allowed disabled:hover:text-white/40"
                              >
                                <Icon icon="bxs:trash" className="w-18 h-18"></Icon>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPageAgent}
            onChange={setCurrentPageAgent}
            showSizeChanger={false}
            total={filteredData.length}
            hideOnSinglePage={true}
            className="flex items-center gap-8 text-14"
            prevIcon={<Icon icon="icon-park-outline:left" />}
            nextIcon={<Icon icon="icon-park-outline:right" />}
            showLessItems
            showTitle={false}
          />
          <div className="w-full overflow-x-auto">
            <div className="text-20 font-bold text-secondary-200">Order History</div>
            <table className="w-full text-white/70">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-8 py-16 text-left w-200">Payer</th>
                  <th className="px-8 py-16 text-left w-160">Amount</th>
                  <th className="px-8 py-16 text-left w-160">Reference</th>
                  <th className="px-8 py-16 text-left w-160">State</th>
                  <th className="px-8 py-16 text-left w-120">Date</th>
                  <th className="px-8 py-16 text-right w-120">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!paymentOrders.length ? (
                  <tr>
                    <td colSpan={6} className="text-error p-24 text-center">
                      No Order Links
                    </td>
                  </tr>
                ) : (
                  <>
                    {paymentOrders.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <tr key={i} className="odd:bg-[#ffffff04]">
                          <td className="px-8 py-16">{item.payer}</td>
                          <td className="px-8 py-16">
                            {item.amount} <span className="opacity-50">{item.currency}</span>
                          </td>
                          <td className="px-8 py-16">{item.description}</td>
                          <td className={`px-8 py-16`}>{PAYMENT_STATE[item.state] || "Error"}</td>
                          <td className="px-8 py-16">{formattedTime(item.requested)}</td>
                          <td className="px-8">
                            <div className="flex items-center gap-16 justify-end">
                              <Link
                                href={`/app/order/${item.paymentId}`}
                                target="_blank"
                                className="text-white/40 u-transition-color hover:text-info"
                              >
                                <Icon icon="ph:eye-fill" className="w-18 h-18"></Icon>
                              </Link>
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
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            total={paymentOrders.length}
            hideOnSinglePage={true}
            className="flex items-center gap-8 text-14"
            prevIcon={<Icon icon="icon-park-outline:left" />}
            nextIcon={<Icon icon="icon-park-outline:right" />}
            showLessItems
            showTitle={false}
          />
        </div>
      ) : (
        <div className="text-white/70">Something went wrong. Please check the link again.</div>
      )}
    </div>
  );
};

export default UserDetailPage;
