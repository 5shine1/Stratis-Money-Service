"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { apiCancelPayment, apiGenerate, apiPaymentHistory } from "@/api/payment.api";
import { ROLES } from "@/@types/common";
import AppInput from "@/components/global/AppInput";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { formattedTime } from "@/utils/string.utils";

import ControlModal from "./components/ControlModal";
import DeleteModal from "./components/DeleteModal";
import { IPayment } from "@/@types/data";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiAdminDeleteOrder, apiAdminPaymentHistory } from "@/api/admin.api";
import StatusFilterSelect from "@/components/global/StatusFilterSelect";
import CreatorFilterSelect from "@/components/global/CreatorFilterSelect";
import { dictionaryGlobal, dictionaryOrder } from "@/config/dictionary";

const OrderPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const { setLoading } = useContext(LoadingContext);
  const [paymentOrders, setPaymentOrders] = useState<IPayment[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDisableFilter, setStatusDisableFilter] = useState([]);
  const [creatorFilter, setCreatorFilter] = useState([]);
  const [controlModalOpen, setControlModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useAppSelector((state) => state.auth);

  const creatorsList = useMemo(() => Array.from(new Set(paymentOrders.map((item) => item.creator))), [paymentOrders]);

  const filteredData = useMemo(
    () =>
      paymentOrders
        .filter((item) => {
          return (
            item?.payer?.toUpperCase().includes(searchIndex.toUpperCase()) ||
            item?.description?.toUpperCase().includes(searchIndex.toUpperCase())
          );
        })
        .filter((item) => {
          if (statusDisableFilter.includes(0) && item.state !== 5 && item.state !== 55 && item.state !== 200)
            return false;
          if (statusDisableFilter.includes(1) && item.state === 200) return false;
          if (statusDisableFilter.includes(2) && item.state === 55) return false;
          if (statusDisableFilter.includes(3) && item.state === 5) return false;
          return true;
        })
        .filter((item) => {
          return !creatorFilter.includes(item.creator);
        })
        .sort((a, b) => new Date(b.requested).getTime() - new Date(a.requested).getTime()),
    [creatorFilter, paymentOrders, searchIndex, statusDisableFilter]
  );

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      if (role === ROLES.ADMIN) {
        const result = await apiAdminPaymentHistory();
        setPaymentOrders(
          result.map((item) => {
            return { ...item, creator: item.agentName || item.businessName };
          })
        );
      } else if (role === ROLES.BUSINESS || role === ROLES.AGENT) {
        const result = await apiPaymentHistory();
        setPaymentOrders(
          result.map((item) => {
            return { ...item, creator: role === ROLES.AGENT ? "Me" : item.agentName || "Me" };
          })
        );
      } else {
        setPaymentOrders([]);
      }
    } catch (error) {
      toast.error(dictionaryOrder.messages.serverError[locale]);
    }
    setIsLoading(false);
  };

  const handleCreateOrder = async (
    amount: number,
    currencySymbol: string,
    description: string,
    payer: string,
    payerName: string,
    payerAddress: string,
    payerDOB: string,
    payerPOB: string,
    language: string
  ) => {
    setLoading(true);
    try {
      const result = await apiGenerate(
        amount,
        currencySymbol,
        description,
        payer,
        payerName,
        payerAddress,
        payerDOB,
        payerPOB,
        language
      );
      if (!result.paymentId) throw "no result";
      setPaymentOrders([
        {
          paymentId: result?.paymentId,
          state: 10,
          requested: dictionaryGlobal.timeFormat.now[locale],
          description,
          payee: "",
          payer,
          currency: currencySymbol,
          amount,
          creator: "Me",
        },
        ...paymentOrders,
      ]);
      toast.success(dictionaryOrder.messages.generatedSuccess[locale]);
      setControlModalOpen(null);
      window.open(`/payment/${result.paymentId}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error(dictionaryOrder.messages.serverError[locale]);
    }
    setLoading(false);
  };

  const handleDeleteOrder = async (id: string) => {
    setLoading(true);
    try {
      if (role === ROLES.ADMIN) {
        await apiAdminDeleteOrder(id);
        toast.success(dictionaryOrder.messages.orderDeleted[locale]);
        setPaymentOrders(paymentOrders.filter((item) => item.paymentId !== id));
      } else {
        await apiCancelPayment(id);
        toast.success(dictionaryOrder.messages.orderCancelled[locale]);
        setPaymentOrders(
          paymentOrders.map((item) => {
            if (item.paymentId === id) return { ...item, state: 5 };
            return item;
          })
        );
      }
    } catch (error) {
      toast.error(dictionaryOrder.messages.serverError[locale]);
    }
    setDeleteModalOpen(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, []); // eslint-disable-line

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">{dictionaryOrder.headings.paymentOrders[locale]}</h4>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch xl:items-center gap-12  xl:flex-row flex-col-reverse ">
            <div className="w-full xl:max-w-280">
              <StatusFilterSelect value={statusDisableFilter} onChange={setStatusDisableFilter} />
            </div>
            <div className="w-full xl:max-w-280">
              <CreatorFilterSelect data={creatorsList} value={creatorFilter} onChange={setCreatorFilter} />
            </div>
            <div className="w-full xl:max-w-280">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder={dictionaryOrder.placeholders.search[locale]}
              ></AppInput>
            </div>
            <AnimatedSlideButton
              onClick={() => {
                setControlModalOpen(true);
              }}
              className=" text-white text-16 py-12 px-32 border border-secondary-300 rounded-full xl:ml-auto w-full xl:max-w-210"
              backClassName="from-primary-400 to-secondary-300 "
            >
              {dictionaryOrder.buttons.generateNew[locale]}
            </AnimatedSlideButton>
          </div>
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
                      <th className="px-8 py-16 text-left w-200">{dictionaryOrder.tableHeaders.payer[locale]}</th>
                      <th className="px-8 py-16 text-left w-160">{dictionaryOrder.tableHeaders.amount[locale]}</th>
                      <th className="px-8 py-16 text-left w-160">{dictionaryOrder.tableHeaders.reference[locale]}</th>
                      <th className="px-8 py-16 text-left w-160">{dictionaryOrder.tableHeaders.state[locale]}</th>
                      <th className="px-8 py-16 text-left w-120">{dictionaryOrder.tableHeaders.date[locale]}</th>
                      <th className="px-8 py-16 text-left w-120">{dictionaryOrder.tableHeaders.creator[locale]}</th>
                      <th className="px-8 py-16 text-right w-120">{dictionaryOrder.tableHeaders.actions[locale]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!filteredData.length ? (
                      <tr>
                        <td colSpan={7} className="text-error p-24 text-center">
                          {dictionaryOrder.messages.noOrders[locale]}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                          return (
                            <tr key={i} className="odd:bg-[#ffffff04]">
                              <td className="px-8 py-16">{item.payer}</td>
                              <td className="px-8 py-16">
                                {item.amount} <span className="opacity-50">{item.currency}</span>
                              </td>
                              <td className="px-8 py-16">{item.description}</td>
                              <td className={`px-8 py-16`}>
                                {dictionaryGlobal.paymentStatus[locale][item.state] || "Error"}
                              </td>
                              <td className="px-8 py-16">{formattedTime(item.requested, locale)}</td>
                              <td className="px-8 py-16">
                                {item.creator} {item.agentName && ` (${dictionaryOrder.agent[locale]})`}
                              </td>
                              <td className="px-8">
                                <div className="flex items-center gap-16 justify-end">
                                  <Link
                                    href={`/payment/${item.paymentId}`}
                                    target="_blank"
                                    className="text-white/40 u-transition-color hover:text-info"
                                  >
                                    <Icon icon="fluent:play-12-filled" className="w-18 h-18"></Icon>
                                  </Link>

                                  <Link
                                    href={`/app/order/${item.paymentId}`}
                                    target="_blank"
                                    className="text-white/40 u-transition-color hover:text-info"
                                  >
                                    <Icon icon="ph:eye-fill" className="w-18 h-18"></Icon>
                                  </Link>

                                  <button
                                    onClick={() => setDeleteModalOpen(item.paymentId)}
                                    disabled={role !== ROLES.ADMIN && (item.state <= 5 || item.state > 40)}
                                    className="text-white/40 u-transition-color hover:text-error disabled:cursor-not-allowed disabled:hover:text-white/40"
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
              <div className="text-white/70 sm:hidden flex flex-col gap-6">
                {!filteredData.length ? (
                  <div className="text-error p-24 text-center">{dictionaryOrder.messages.noOrders[locale]}</div>
                ) : (
                  <>
                    {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <div key={i} className="bg-[#ffffff04] p-12 flex flex-col gap-12 rounded-6">
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.payer[locale]}</div>
                            <div className="u-text-overflow">{item.payer}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.amount[locale]}</div>
                            <div className="u-text-overflow">
                              {item.amount} <span className="opacity-50">{item.currency}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.reference[locale]}</div>
                            <div className="u-text-overflow">{item.description}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.state[locale]}</div>
                            <div className="u-text-overflow">
                              {dictionaryGlobal.paymentStatus[locale][item.state] || "Error"}
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.date[locale]}</div>
                            <div className="u-text-overflow">{formattedTime(item.requested, locale)}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.creator[locale]}</div>
                            <div className="u-text-overflow">
                              {item.creator} {item.agentName && `(${dictionaryOrder.agent[locale]})`}
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-24 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryOrder.tableHeaders.actions[locale]}</div>
                            <div className="flex items-center gap-16 justify-end">
                              <Link
                                href={`/payment/${item.paymentId}`}
                                target="_blank"
                                className="text-white/40 u-transition-color hover:text-info"
                              >
                                <Icon icon="fluent:play-12-filled" className="w-18 h-18"></Icon>
                              </Link>

                              <Link
                                href={`/app/order/${item.paymentId}`}
                                target="_blank"
                                className="text-white/40 u-transition-color hover:text-info"
                              >
                                <Icon icon="ph:eye-fill" className="w-18 h-18"></Icon>
                              </Link>

                              <button
                                onClick={() => setDeleteModalOpen(item.paymentId)}
                                className="text-white/40 u-transition-color hover:text-error"
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
      <ControlModal isOpen={controlModalOpen} onClose={() => setControlModalOpen(null)} onNext={handleCreateOrder} />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(null)}
        onNext={() => handleDeleteOrder(deleteModalOpen)}
      />
    </>
  );
};

export default OrderPage;
