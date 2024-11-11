"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "rc-pagination";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import InviteModal from "./components/InviteModal";
import { apiRemoveAgent, apiUserInfo } from "@/api/auth.api";
import DeleteModal from "./components/DeleteModal";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import toast from "react-hot-toast";
import { IAgent } from "@/@types/data";

const OrderPage = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const { setLoading } = useContext(LoadingContext);

  const filteredData = useMemo(
    () =>
      agents.filter((item) => {
        return (
          item.name.toUpperCase().includes(searchIndex.toUpperCase()) ||
          item.email.toUpperCase().includes(searchIndex.toUpperCase())
        );
      }),
    [agents, searchIndex]
  );

  const handleGetAgents = async () => {
    setIsLoading(true);
    try {
      const result = await apiUserInfo();
      setAgents(result.agents || []);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleDeleteAgent = async (id: string) => {
    setLoading(true);
    try {
      await apiRemoveAgent(id);
      toast.success("Agent removed successfully.");
      setAgents(agents.filter((item) => item.agentId !== id));
    } catch (error) {
      toast.error("Server error.");
    }
    setDeleteModalOpen(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAgents();
  }, []);

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
              className=" text-white text-16 py-12 px-32 border border-secondary-300 rounded-full"
              backClassName="from-primary-400 to-secondary-300 "
            >
              Invite agent
            </AnimatedSlideButton>
          </div>
          {isLoading ? (
            <div className="text-white/70 p-12 text-center">
              <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto ">
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
                            <tr key={i} className="even:bg-[#ffffff04]">
                              <td className="px-8 py-16">{item.name}</td>
                              <td className="px-8 py-16">{item.email}</td>
                              <td className="px-8 py-16">{item.country}</td>
                              <td className="px-8 py-16">{item.mobileNumber}</td>
                              <td className="px-8 py-16 text-right">
                                <button
                                  onClick={() => setDeleteModalOpen(item.agentId)}
                                  className="text-white/40 u-transition-color hover:text-error disabled:cursor-not-allowed disabled:hover:text-white/40"
                                >
                                  <Icon icon="bxs:trash" className="w-18 h-18"></Icon>
                                </button>
                              </td>
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
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(null)}
        onNext={() => handleDeleteAgent(deleteModalOpen)}
      />
    </>
  );
};

export default OrderPage;
