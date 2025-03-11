"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "rc-pagination";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import InviteModal from "./components/InviteModal";
import { apiActivateAgent, apiRemoveAgent, apiUserInfo } from "@/api/auth.api";
import DeleteModal from "./components/DeleteModal";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import toast from "react-hot-toast";
import { IAgent } from "@/@types/data";
import ActiveModal from "./components/ActiveModal";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAgent } from "@/config/dictionary";

const OrderPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [activeModalOpen, setActiveModalOpen] = useState<string | null>(null);
  const { setLoading } = useContext(LoadingContext);
  const [url, setUrl] = useState("");
    
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);  

  const filteredData = useMemo(
    () =>
      agents
        .filter((item) => {
          return (
            item.name.toUpperCase().includes(searchIndex.toUpperCase()) ||
            item.email.toUpperCase().includes(searchIndex.toUpperCase())
          );
        })
        .sort((a, b) => {
          return Number(a.isDeleted) - Number(b.isDeleted);
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
      toast.success(dictionaryAgent.agentsPage.messages.agentRemoved[locale]);
      setAgents(
        agents.map((item) => {
          if (item.agentId === id) return { ...item, isDeleted: true };
          return item;
        })
      );
    } catch (error) {
      toast.error(dictionaryAgent.agentsPage.messages.serverError[locale]);
    }
    setDeleteModalOpen(null);
    setLoading(false);
  };

  const handleActivateAgent = async (id: string) => {
    setLoading(true);
    try {
      await apiActivateAgent(id);
      toast.success(dictionaryAgent.agentsPage.messages.agentRestored[locale]);
      setAgents(
        agents.map((item) => {
          if (item.agentId === id) return { ...item, isDeleted: false };
          return item;
        })
      );
    } catch (error) {
      toast.error(dictionaryAgent.agentsPage.messages.serverError[locale]);
    }
    setActiveModalOpen(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAgents();
  }, []);

  return (
    <>
      <title>Agent Services - Stratis Money Servicee</title>
      {/* Open Graph Meta Tags */}
      <meta name="description" content="Join Stratis Money Service as an agent and help bridge the gap between traditional and digital finance." />
      <meta property="og:title" content="Agent Services - Stratis Money Service" />
      <meta property="og:description" content="Become an agent at Stratis Money Service and provide seamless financial solutions to users." />
      <meta property="og:url" content={`${url}/app/agent`} />
      <meta property="og:site_name" content="Agent Services - Stratis Money Service" />
      <meta property="og:image" content={`${url}/assets/landing/meta-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Agent Services - Stratis Money Service" />
      <meta name="twitter:description" content="Join Stratis Money Service as an agent and help provide financial solutions." />
      <meta name="twitter:image" content={`${url}/assets/landing/meta-image.png`}  />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="675" />

      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <div className="flex">
          <h4 className="w-fit g-header-app">{dictionaryAgent.agentsPage.headings.title[locale]}</h4>
          <button
            onClick={() => {
              setIsInviteModalOpen(true);
            }}
            className="text-16 max-w-210 ml-auto hidden sm:flex xl:hidden  text-button-text font-semibold py-12 px-32 rounded-12 gap-8 items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          >
            {dictionaryAgent.agentsPage.buttons.inviteAgent[locale]}
            <Icon icon="material-symbols-light:real-estate-agent-outline" className="w-16 h-16" />
          </button> 
        </div>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch md:items-center justify-between gap-12  md:flex-row flex-col-reverse ">
            <div className="w-full xl:max-w-320">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder="Search by name and email"
              ></AppInput>
            </div>
            <button
              onClick={() => {
                setIsInviteModalOpen(true);
              }}
              className="text-16 w-full flex xl:max-w-210 xl:ml-auto sm:hidden xl:flex text-button-text font-semibold py-12 rounded-12 gap-8 items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
            >
              {dictionaryAgent.agentsPage.buttons.inviteAgent[locale]}
              <Icon icon="material-symbols-light:real-estate-agent-outline" className="w-16 h-16" />
            </button>
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
                      <th className="px-8 py-16 text-left w-200">
                        {dictionaryAgent.agentsPage.tableHeaders.name[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-160">
                        {dictionaryAgent.agentsPage.tableHeaders.email[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-160">
                        {dictionaryAgent.agentsPage.tableHeaders.location[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-160">
                        {dictionaryAgent.agentsPage.tableHeaders.phone[locale]}
                      </th>
                      <th className="px-8 py-16 text-left w-60"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!filteredData.length ? (
                      <tr>
                        <td colSpan={5} className="text-error p-24 text-center">
                          {dictionaryAgent.agentsPage.messages.noAgents[locale]}
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
                                    onClick={() => setActiveModalOpen(item.agentId)}
                                    className="text-white/40 u-transition-color hover:text-info disabled:cursor-not-allowed disabled:hover:text-white/40"
                                  >
                                    <Icon icon="mdi:restore-clock" className="w-20 h-20"></Icon>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setDeleteModalOpen(item.agentId)}
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
              <div className="text-white/70 sm:hidden flex flex-col gap-6">
                {!filteredData.length ? (
                  <div className="text-error p-24 text-center">{dictionaryAgent.agentsPage.messages.noAgents[locale]}</div>
                ) : (
                  <>
                    {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                      return (
                        <div key={i} className="bg-[#ffffff04] p-12 flex flex-col gap-12 rounded-6">
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryAgent.agentsPage.tableHeaders.name[locale]}</div>
                            <div className="u-text-overflow">{item.name}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryAgent.agentsPage.tableHeaders.email[locale]}</div>
                            <div className="u-text-overflow">{item.email}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryAgent.agentsPage.tableHeaders.location[locale]}</div>
                            <div className="u-text-overflow">{item.country}</div>
                          </div>
                          <div className="flex justify-between items-center gap-72 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryAgent.agentsPage.tableHeaders.phone[locale]}</div>
                            <div className="u-text-overflow">{item.mobileNumber}</div>
                          </div>
                          <div className="flex justify-between items-center gap-24 overflow-hidden">
                            <div className="flex-none opacity-70">{dictionaryAgent.agentsPage.tableHeaders.actions[locale]}</div>
                            <div className="flex items-center gap-16 justify-end">
                              {item.isDeleted ? (
                                <button
                                  onClick={() => setActiveModalOpen(item.agentId)}
                                  className="text-white/40 u-transition-color hover:text-info disabled:cursor-not-allowed disabled:hover:text-white/40"
                                >
                                  <Icon icon="mdi:restore-clock" className="w-20 h-20"></Icon>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setDeleteModalOpen(item.agentId)}
                                  className="text-white/40 u-transition-color hover:text-error disabled:cursor-not-allowed disabled:hover:text-white/40"
                                >
                                  <Icon icon="bxs:trash" className="w-18 h-18"></Icon>
                                </button>
                              )}
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
      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(null)}
        onNext={() => handleDeleteAgent(deleteModalOpen)}
      />
      <ActiveModal
        isOpen={activeModalOpen}
        onClose={() => setActiveModalOpen(null)}
        onNext={() => handleActivateAgent(activeModalOpen)}
      />
    </>
  );
};

export default OrderPage;
