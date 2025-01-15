"use client";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import CustomSwitch from "@/components/global/CustomSwitch";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiStartKYB } from "@/api/compliance.api";
import { KYB_STATUS_IDS, ROLES } from "@/@types/common";
import { apiGetSetting, apiSetSetting } from "@/api/auth.api";
import BankModal from "./components/BankModal";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setSettings } from "@/store/slices/setting.slice";
import { dictionaryGlobal, dictionaryProfile } from "@/config/dictionary";

const AccountPage = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const { setLoading } = useContext(LoadingContext);
  const [bankModalShow, setBankModalShow] = useState(false);
  const { userId, name, role, email, kybApplicationStatus, mobileNumber, country } = useAppSelector(
    (state) => state.auth
  );
  const { bankAccountHolder, bankIban, bankBic, acceptNonStablecoinPayments } = useAppSelector(
    (state) => state.setting
  );
  const dispatch = useAppDispatch();

  const handleStartKYB = async () => {
    setLoading(true);
    try {
      const result = await apiStartKYB();
      window.open(result.link, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.log(error);
      toast.error(dictionaryProfile.toastMessages.serverError[locale]);
    }
    setLoading(false);
  };

  const getSetting = async () => {
    try {
      const result = await apiGetSetting();
      dispatch(setSettings(result?.businessSettings));
    } catch (error) {}
  };

  const setSetting = async (account: string, iban: string, bic: string) => {
    setLoading(true);
    try {
      const result = await apiSetSetting(userId, true, account, iban, bic);
      if (result) toast.success(dictionaryProfile.toastMessages.bankConnected[locale]);
      getSetting();
      setBankModalShow(false);
    } catch (error) {
      console.log(error);
      toast.error(dictionaryProfile.toastMessages.serverError[locale]);
    }
    setLoading(false);
  };

  const setNonStableCoinsSetting = async () => {
    setLoading(true);
    try {
      const result = await apiSetSetting(
        userId,
        true,
        bankAccountHolder,
        bankIban,
        bankBic,
        !acceptNonStablecoinPayments
      );
      if (result) toast.success(dictionaryProfile.toastMessages.settingChanged[locale]);
      getSetting();
    } catch (error) {
      console.log(error);
      toast.error(dictionaryProfile.toastMessages.serverError[locale]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">{dictionaryProfile.headings.myAccount[locale]}</h4>

        <div className="flex flex-col gap-16">
          <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
            <div className="text-20 font-bold text-secondary-200">{dictionaryProfile.headings.profile[locale]}</div>
            <div className="flex flex-col gap-16 mt-18 text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.userId[locale]}
                </span>
                {userId}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.email[locale]}
                </span>
                {email}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.name[locale]}
                </span>
                {name}
              </div>
              <div className={`flex gap-4 flex-col sm:flex-row break-all ${role === ROLES.ADMIN ? "text-info" : ""}`}>
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.role[locale]}
                </span>
                {dictionaryGlobal.roles[locale][role]}
              </div>

              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.phoneNumber[locale]}
                </span>
                {mobileNumber}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryProfile.profileLabels.address[locale]}
                </span>
                {country}
              </div>
            </div>
          </div>

          {role === ROLES.BUSINESS && (
            <div className="flex flex-col md:flex-row gap-16">
              <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
                <div className="text-20 font-bold text-secondary-200">
                  {dictionaryProfile.headings.kybStatus[locale]}
                </div>
                <div className="mt-18 flex items-center gap-12">
                  {kybApplicationStatus > KYB_STATUS_IDS.DeclinedByKybProvider ? (
                    <div className="flex items-center gap-4 border border-success text-success rounded-4 px-8 py-4">
                      <Icon icon="ph:seal-check-bold" className="w-20 h-20" />
                      {dictionaryProfile.kybStatusMessages.approved[locale]}
                    </div>
                  ) : kybApplicationStatus === KYB_STATUS_IDS.DeclinedByKybProvider ? (
                    <div className="flex items-center gap-4 border border-error text-error rounded-4 px-8 py-4">
                      <Icon icon="jam:close-circle" className="w-20 h-20" />
                      {dictionaryProfile.kybStatusMessages.declined[locale]}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 border border-error text-error rounded-4 px-8 py-4">
                        <Icon icon="jam:close-circle" className="w-18 h-18" />
                        {kybApplicationStatus === KYB_STATUS_IDS.Pending
                          ? dictionaryProfile.kybStatusMessages.notStarted[locale]
                          : dictionaryProfile.kybStatusMessages.timedOut[locale]}
                      </div>
                      <div
                        onClick={handleStartKYB}
                        className=" text-white text-1 flex items-center gap-2 cursor-pointer u-transition-color hover:text-info"
                      >
                        {dictionaryProfile.kybStatusMessages.startKyb[locale]}
                        <Icon icon={"ep:right"}></Icon>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
                <div className="text-20 font-bold text-secondary-200">
                  {dictionaryProfile.headings.complianceStatus[locale]}
                </div>
                <div className="mt-18 flex items-center gap-12">
                  {kybApplicationStatus === KYB_STATUS_IDS.ApprovedByCompliance ? (
                    <div className="flex items-center gap-4 border border-success text-success rounded-4 px-8 py-4">
                      <Icon icon="ph:seal-check-bold" className="w-20 h-20" />
                      {dictionaryProfile.complianceStatusMessages.approved[locale]}
                    </div>
                  ) : kybApplicationStatus === KYB_STATUS_IDS.RejectedByCompliance ? (
                    <div className="flex items-center gap-4 border border-error text-error rounded-4 px-8 py-4">
                      <Icon icon="jam:close-circle" className="w-20 h-20" />
                      {dictionaryProfile.complianceStatusMessages.disapproved[locale]}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 border border-error text-error rounded-4 px-8 py-4">
                      <Icon icon="bi:hourglass" className="w-20 h-20" />
                      {dictionaryProfile.complianceStatusMessages.pending[locale]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {(role === ROLES.BUSINESS || role === ROLES.AGENT) && (
            <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
              <div className="text-20 font-bold text-secondary-200">
                {role === ROLES.AGENT && dictionaryGlobal.roles[locale].Business}{" "}
                {dictionaryProfile.headings.setting[locale]}
              </div>
              <div className="flex md:items-center gap-12 md:gap-32 mt-18 flex-col md:flex-row items-start">
                <div className=" flex items-center gap-4">
                  <span>{dictionaryProfile.settings.acceptNonStablecoin[locale]} </span>
                  <div className="relative group">
                    <Icon icon="fe:question" className="text-info w-17 h-17 cursor-pointer inline" />
                    <div className="absolute left-1/2 bottom-full -translate-x-[85%] md:-translate-x-1/2 w-280 text-12 bg-primary-700 p-12 rounded-8 transition-all duration-100 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:mb-4 -mb-4 pointer-events-none opacity-0">
                      {dictionaryProfile.settings.tooltip[locale]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-12 ">
                  OFF
                  <CustomSwitch
                    clickable={role === ROLES.BUSINESS}
                    value={acceptNonStablecoinPayments}
                    onChange={setNonStableCoinsSetting}
                  />
                  ON
                </div>
              </div>
            </div>
          )}

          {role === ROLES.BUSINESS && (
            <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
              <div className="text-20 font-bold text-secondary-200">
                {dictionaryProfile.headings.bankDetail[locale]}
              </div>
              {!bankAccountHolder ? (
                <div className="mt-12 text-info cursor-pointer" onClick={() => setBankModalShow(true)}>
                  {dictionaryProfile.bankDetail.connectBank[locale]}
                </div>
              ) : (
                <div className="flex gap-12 mt-18 flex-col items-start">
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryProfile.bankDetail.accountName[locale]}
                    </span>
                    {bankAccountHolder}
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryProfile.bankDetail.iban[locale]}
                    </span>
                    {bankIban}
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryProfile.bankDetail.bic[locale]}
                    </span>
                    {bankBic}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BankModal isOpen={bankModalShow} onClose={() => setBankModalShow(false)} onNext={setSetting} />
    </>
  );
};

export default AccountPage;
