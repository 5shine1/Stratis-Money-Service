"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { apiGenerate, apiPaymentHistory } from "@/api/payment.api";
import { PAYMENT_STATE, ROLES } from "@/@types/common";
import AppInput from "@/components/global/AppInput";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { callAPI } from "@/config/mock";
import { formattedTime } from "@/utils/string.utils";

import ControlModal from "./components/ControlModal";
import DeleteModal from "./components/DeleteModal";
import { IPayment } from "@/@types/data";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiAdminPaymentHistory } from "@/api/admin.api";

const OrderPage = () => {
  const { setLoading } = useContext(LoadingContext);
  const [paymentOrders, setPaymentOrders] = useState<IPayment[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [controlModalOpen, setControlModalOpen] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useAppSelector((state) => state.auth);

  const filteredData = useMemo(
    () =>
      paymentOrders
        .filter((item) => {
          return (
            item?.payer?.toUpperCase().includes(searchIndex.toUpperCase()) ||
            item?.paymentId?.toUpperCase().includes(searchIndex.toUpperCase())
          );
        })
        .sort((a, b) => new Date(b.requested).getTime() - new Date(a.requested).getTime()),
    [paymentOrders, searchIndex]
  );

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      if (role === ROLES.ADMIN) {
        const result = await apiPaymentHistory();
        setPaymentOrders(result);
      }
      const result = await apiAdminPaymentHistory();
      setPaymentOrders(result);
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };
  const handleCreateOrder = async (amount: number, currencySymbol: string, description: string, payer: string) => {
    setLoading(true);
    try {
      const result = await apiGenerate(amount, currencySymbol, description, payer);
      setPaymentOrders([
        {
          paymentId: result?.paymentId,
          state: 10,
          requested: "now",
          description,
          payee: "",
          payer,
          currency: currencySymbol,
          amount,
        },
        ...paymentOrders,
      ]);
      toast.success("Generated new link successfully.");
      setControlModalOpen(null);
    } catch (error) {
      toast.error("Server error.");
    }
    setLoading(false);
  };
  const handleEditOrder = async () => {
    setLoading(true);
    try {
      await callAPI();
      toast.success("Detail updated successfully.");
      setControlModalOpen(null);
    } catch (error) {
      toast.error("Server error.");
    }
    setLoading(false);
  };
  const handleDeleteOrder = async () => {
    setLoading(true);
    try {
      await callAPI();
      toast.success("Detail deleted successfully.");
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error("Server error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, []); // eslint-disable-line

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">Payment Orders</h4>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch md:items-center justify-between gap-12  md:flex-row flex-col-reverse ">
            <div className="w-full md:max-w-320">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder="Search by payment ID and payer"
              ></AppInput>
            </div>
            <AnimatedSlideButton
              onClick={() => {
                setControlModalOpen("");
              }}
              className=" text-primary-200 dark:text-white text-16 py-12 px-32 border border-primary-200 dark:border-secondary-300 rounded-full"
              backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
            >
              Generate New
            </AnimatedSlideButton>
          </div>
          {isLoading ? (
            <div className="text-primary-200 dark:text-white/70 p-12 text-center">
              <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto hidden lg:block">
                <table className="w-full text-primary-200 dark:text-white/70">
                  <thead>
                    <tr className="border-b border-primary-200/20 dark:border-white/10">
                      <th className="px-8 py-16 text-left w-200">Payer</th>
                      <th className="px-8 py-16 text-left w-160">Amount</th>
                      <th className="px-8 py-16 text-left w-160">Reference</th>
                      <th className="px-8 py-16 text-left w-160">State</th>
                      <th className="px-8 py-16 text-left w-120">Date</th>
                      <th className="px-8 py-16 text-right w-120">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!filteredData.length ? (
                      <tr>
                        <td colSpan={5} className="text-error p-24 text-center">
                          No Order Links
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                          return (
                            <tr key={i} className="odd:bg-secondary-100/10 dark:odd:bg-[#ffffff04]">
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
                                    className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-info"
                                  >
                                    <Icon icon="ph:eye-fill" className="w-18 h-18"></Icon>
                                  </Link>
                                  <button
                                    onClick={() => setControlModalOpen(item.paymentId)}
                                    className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-success"
                                  >
                                    <Icon icon="fluent:edit-48-filled" className="w-18 h-18"></Icon>
                                  </button>
                                  <button
                                    onClick={() => setDeleteModalOpen(true)}
                                    className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-error"
                                  >
                                    <Icon icon="bxs:trash" className="w-18 h-18"></Icon>
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
              <div className="text-primary-200 dark:text-white/70 lg:hidden flex flex-col gap-6">
                {!filteredData.length ? (
                  <div className="text-error p-24 text-center">No Order Links</div>
                ) : (
                  <>
                    {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="bg-secondary-100/10 dark:bg-[#ffffff04] p-12 flex flex-col gap-12 rounded-6"
                        >
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">Payer</div>
                            <div className="u-text-overflow">{item.payer}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">Amount</div>
                            <div className="u-text-overflow">
                              {item.amount} <span className="opacity-50">{item.currency}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">Reference</div>
                            <div className="u-text-overflow">{item.description}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">State</div>
                            <div className="u-text-overflow">{PAYMENT_STATE[item.state] || "Error"}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">Date</div>
                            <div className="u-text-overflow">{formattedTime(item.requested)}</div>
                          </div>
                          <div className="flex justify-between items-center gap-24 overflow-hidden">
                            <div className="flex-none opacity-70">Actions</div>
                            <div className="flex items-center gap-16 justify-end">
                              <Link
                                href={`/app/order/${item.paymentId}`}
                                target="_blank"
                                className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-info"
                              >
                                <Icon icon="ph:eye-fill" className="w-18 h-18"></Icon>
                              </Link>
                              <button
                                onClick={() => setControlModalOpen(item.paymentId)}
                                className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-success"
                              >
                                <Icon icon="fluent:edit-48-filled" className="w-18 h-18"></Icon>
                              </button>
                              <button
                                onClick={() => setDeleteModalOpen(true)}
                                className="text-primary-200/30 dark:text-white/40 u-transition-color hover:text-error"
                              >
                                <Icon icon="bxs:trash" className="w-18 h-18"></Icon>
                              </button>
                            </div>
                          </div>
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
      <ControlModal
        isOpen={controlModalOpen !== null}
        onClose={() => setControlModalOpen(null)}
        data={paymentOrders.find((item) => item.paymentId === controlModalOpen)}
        onNext={controlModalOpen === "" ? handleCreateOrder : handleEditOrder}
      />
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onNext={handleDeleteOrder} />
    </>
  );
};

export default OrderPage;
