"use client";
import React, { useMemo, useState } from "react";
import Pagination from "rc-pagination";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import InviteModal from "./components/InviteModal";

const OrderPage = () => {
  const [paymentOrders] = useState<any[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading] = useState(false);

  const filteredData = useMemo(
    () => paymentOrders.sort((a, b) => new Date(b.requested).getTime() - new Date(a.requested).getTime()),
    [paymentOrders]
  );

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">Agents</h4>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch md:items-center justify-between gap-12  md:flex-row flex-col-reverse ">
            <div className="w-full md:max-w-320">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder="Search by name and email"
              ></AppInput>
            </div>
            <AnimatedSlideButton
              onClick={() => {
                setIsInviteModalOpen(true);
              }}
              className=" text-primary-200 dark:text-white text-16 py-12 px-32 border border-primary-200 dark:border-secondary-300 rounded-full"
              backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
            >
              Invite agent
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
                      <th className="px-8 py-16 text-left w-200">Name</th>
                      <th className="px-8 py-16 text-left w-160">Email</th>
                      <th className="px-8 py-16 text-left w-160">Location</th>
                      <th className="px-8 py-16 text-left w-160">Phone</th>
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
                        <tr>
                          <td colSpan={4} className="text-error p-24 text-center">
                            No Agents
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
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
      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </>
  );
};

export default OrderPage;
