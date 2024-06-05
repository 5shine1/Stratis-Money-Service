"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { callAPI, mockOrderLinks } from "@/config/mock";

import ControlModal from "./components/ControlModal";
import DeleteModal from "./components/DeleteModal";

const PaymentPage = () => {
  const { setLoading } = useContext(LoadingContext);
  const [paymentOrders, setPaymentOrders] = useState([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [controlModalOpen, setControlModalOpen] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = useMemo(
    () =>
      paymentOrders.filter((item) => {
        return item.to.toUpperCase().includes(searchIndex.toUpperCase());
      }),
    [paymentOrders, searchIndex]
  );

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
  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      await callAPI();
      setPaymentOrders([mockOrderLinks[8], ...mockOrderLinks]);
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
  }, []);

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-48 lg:p-48 py-32 p-8">
        <h2 className="w-fit">Payment Orders</h2>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch md:items-center justify-between gap-12  md:flex-row flex-col-reverse ">
            <div className="w-full md:max-w-320">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder="Search by payer name"
              ></AppInput>
            </div>
            <AnimatedSlideButton
              onClick={() => {
                setControlModalOpen("");
              }}
              className=" text-16 py-12 px-32 border border-secondary-300 rounded-full"
            >
              Generate New
            </AnimatedSlideButton>
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
                            <td className="px-8">
                              <div className="flex items-center gap-12 justify-end">
                                <button className="text-white/60 u-transition-color hover:text-info">
                                  <Icon icon="ph:eye-fill" className="w-20 h-20"></Icon>
                                </button>
                                <button
                                  onClick={() => setControlModalOpen(item.id)}
                                  className="text-white/60 u-transition-color hover:text-success"
                                >
                                  <Icon icon="fluent:edit-48-filled" className="w-20 h-20"></Icon>
                                </button>
                                <button
                                  onClick={() => setDeleteModalOpen(true)}
                                  className="text-white/60 u-transition-color hover:text-error"
                                >
                                  <Icon icon="bxs:trash" className="w-20 h-20"></Icon>
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
      <ControlModal
        isOpen={controlModalOpen !== null}
        onClose={() => setControlModalOpen(null)}
        data={paymentOrders.find((item) => item.id === controlModalOpen)}
        onNext={controlModalOpen === null ? handleCreateOrder : handleEditOrder}
      />
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onNext={handleDeleteOrder} />
    </>
  );
};

export default PaymentPage;
