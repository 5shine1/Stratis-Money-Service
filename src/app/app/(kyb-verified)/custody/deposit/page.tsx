"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import CustomSelect from "@/components/global/CustomSelect";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { getChainInfo } from "@/utils/web3.utils";
import IconBox from "@/components/global/IconBox";
import ChainLine from "@/app/payment/[id]/components/ChainLine";
import IconBoxSm from "@/components/global/IconBoxSm";
import { dictionaryPayment, dictionaryWithdraw } from "@/config/dictionary";
import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, bitgetWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { arbitrumSepolia, baseSepolia, mainnet, optimismSepolia, polygonAmoy, sepolia } from "viem/chains";
import useAppSelector from "@/hooks/global/useAppSelector";
import ConnectButton from "@/app/components/ConnectButton";
import "@rainbow-me/rainbowkit/styles.css";
import { isMobile } from "react-device-detect";
import { acceptableCurrencies } from "./data"
import AppInput from "@/components/global/AppInput";

const DepositPage: React.FC = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const totalConfirmations = 6;
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState(10);
  const [currency, setCurrency] = useState(0);
  const [network, setNetwork] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin2, setIsSpin2] = useState(false);
  const [isSpin3, setIsSpin3] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [paymentLinkData, setPaymentLinkData] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("0x45782255586944a4587df5rr6s5e");
  const [paymentAmount, setPaymentAmount] = useState({error: "", value: ""});
  const [selectedCurrency, setSelectedCurrency] = useState<any>();

  const networkList = useMemo(
    () =>
      currencies
        .filter((item, index, self) => index === self.findIndex((t) => t.chainName === item.chainName))
        .map((item, id) => {
          return { ...item, id, text: item.chainName };
        }),
    [currencies]
  );
  const currencyList = useMemo(
    () =>
      currencies
        .filter((item) => {
          return item.chainName === networkList[network]?.text;
        })
        .map((item, id) => {
          return { ...item, id };
        }),
    [currencies, network, networkList]
  );

  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const selectedCurrency = acceptableCurrencies.find(
        (item) => item.symbol === currencyList[currency].text && item.chainId === networkList[network].chainId
      );

      const link = `ethereum:${paymentAddress}@${1}?value=${100}e18`;

      setPaymentLinkData(link);
      setSelectedCurrency(selectedCurrency);

      setStatus(60);
    } catch (error) {
      console.log(error);
      toast.error(dictionaryPayment.toast.serverError[locale]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (acceptableCurrencies) {
        const currencyPromises = acceptableCurrencies.map(async (item, i) => {
          const chain = await getChainInfo(item?.chainId);
          return {
            id: i,
            key: item?.currencyId,
            text: item?.symbol,
            icon: item?.icon,
            chainName: chain.name,
            chainId: item?.chainId,
          };
        });
        const resolvedCurrencies = await Promise.all(currencyPromises);
        setCurrencies(resolvedCurrencies);
      }
    };
    setIsLoading(false);

    fetchCurrencies();
  }, [acceptableCurrencies]);

  const config = getDefaultConfig({
    appName: "stratis money service",
    projectId: "YOUR_PROJECT_ID",
    chains: [sepolia, mainnet, polygonAmoy, arbitrumSepolia, optimismSepolia, baseSepolia],
    wallets: [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet, walletConnectWallet, rainbowWallet, bitgetWallet],
      },
    ],
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#cdb053" })}>
          {isLoading ? null : (
            <main className="overflow-x-hidden relative py-40 px-12 flex justify-between md:justify-center items-center h-full  min-h-screen m-auto flex-col gap-32 md:gap-60 w-full ">
              <Link href={"/"} className="flex flex-col md:flex-row items-center gap-16 justify-center">
                <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
                <h4 className="text-center">Stratis Money Service</h4>
              </Link>
              {status === 60 ? (
                //-------------deposite------------
                <section className="relative g-box-back rounded-20 border border-modal-border px-20 py-40 md:p-40 flex flex-col gap-40 w-full max-w-920 items-center">
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute left-0 top-0"
                  />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1]"
                  />
                  <div className="relative flex items-start md:items-center gap-24 md:gap-12 w-full max-w-540  flex-col md:flex-row md:pb-50">
                    <div className="relative flex items-center gap-8">
                      <IconBox icon="lets-icons:check-ring" />
                      <span className="md:hidden text-14 text-[#BDCCD8]">
                        {dictionaryPayment.status.requested[locale]}
                      </span>
                      <span className="absolute left-1/2 text-14 whitespace-nowrap -translate-x-1/2 top-full mt-12 hidden md:block text-[#BDCCD8]">
                        {dictionaryPayment.status.requested[locale]}
                      </span>
                    </div>
                    <ChainLine />
                    <div className="relative flex items-center gap-8">
                      <IconBox
                        icon={isSpin2 ? "lets-icons:check-ring" : "eos-icons:loading"}
                        className={`w-24 h-24 ${isSpin2 ? "text-secondary-main" : "text-[#516972]"}`}
                      />

                      <span className="md:hidden text-14 text-[#BDCCD8]">
                        {dictionaryPayment.status.received[locale]}
                      </span>
                      <span className="absolute left-1/2 text-14 w-180 text-center -translate-x-1/2 top-full mt-12 hidden md:block text-[#BDCCD8]">
                        {dictionaryPayment.status.received[locale]}
                      </span>
                    </div>
                    <ChainLine />
                    <div className="relative flex items-center gap-8">
                      <IconBox
                        icon={isSpin3 ? "lets-icons:check-ring" : "eos-icons:loading"}
                        className={`w-24 h-24 ${isSpin3 ? "text-secondary-main" : "text-[#516972]"}`}
                      />
                      <span className="md:hidden text-14  text-[#BDCCD8]">
                        {dictionaryPayment.status.completed[locale]} ({confirmStep}/{totalConfirmations})
                      </span>
                      <span className="absolute left-1/2 text-14 whitespace-nowrap -translate-x-1/2 top-full mt-12 hidden md:block  text-[#BDCCD8]">
                        {dictionaryPayment.status.completed[locale]} ({confirmStep}/{totalConfirmations})
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 bg-[#031520B2] rounded-8 max-w-780 mx-auto w-full p-24">
                    <div className=" flex items-start md:items-center flex-col md:flex-row gap-40 md:gap-24 justify-between">
                      <div className="flex flex-col gap-24 md:gap-40">
                        <div className="flex items-start flex-col md:flex-row gap-20 md:gap-40">
                          <div className="flex flex-col gap-6">
                            <span className="text-[#6B7A87] text-14">
                              {dictionaryPayment.labels.network[locale]}
                            </span>
                            <div className="font-medium text-[#BDCCD8] text-20 md:text-24">
                              {networkList[network].text}
                            </div>
                          </div>
                          <div className="flex flex-col gap-6">
                            <span className="text-[#6B7A87]  text-14">
                              {dictionaryPayment.labels.amount[locale]}
                            </span>
                            <div className="font-medium text-[#BDCCD8] text-20 md:text-24 flex items-center gap-8">
                              {paymentAmount.value} {currencyList[currency].text}
                              <div
                                className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(String(paymentAmount.value));

                                  toast.success(dictionaryPayment.toast.copied[locale]);
                                }}
                              >
                                <IconBoxSm icon="ph:copy-light" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-6">
                          <span className="text-[#6B7A87]  text-14">
                            {dictionaryPayment.labels.depositAddress[locale]}
                          </span>
                          <div className="font-medium text-[#BDCCD8] text-17 flex items-start sm:items-center gap-8">
                            <span className="hidden md:block">{paymentAddress}</span>
                            <span className="md:hidden text-16 break-all">{paymentAddress}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(paymentAddress);
                                toast.success(dictionaryPayment.toast.copied[locale]);
                              }}
                            >
                              <IconBoxSm icon="ph:copy-light" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-8 w-full max-w-280 sm:max-w-180 aspect-square mx-auto md:mx-0">
                        <div className="relative">
                          <div className=" top-0 left-0 absolute w-full aspect-square bg-[#DEAD3D99] rotate-[-5.4deg] rounded-8 "></div>
                          <QRCode
                            className="rounded-8 relative "
                            value={paymentLinkData}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-32">
                      {isMobile ? (
                        <button
                          className="w-full max-w-320 text-button-text text-12 font-semibold py-12  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                          onClick={() => {
                            window.location.href = paymentLinkData;
                          }}
                        >
                          {dictionaryPayment.buttons.payNow[locale]}
                        </button>
                      ) : (
                        <ConnectButton
                          paymentDestination={paymentAddress}
                          amount={paymentAmount.value}
                          chainProp={networkList[network]}
                          selectedCurrency={selectedCurrency}
                        />
                      )}
                    </div>
                  </div>
                </section>
              ) : (
                // ----------------init payment-----------------
                <section className="relative g-box-back rounded-20 border border-modal-border p-20 md:p-24 flex flex-col gap-32 w-full max-w-820 items-center">
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute left-0 top-0"
                  />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1] hidden md:block"
                  />
                  <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                    <IconBox icon="material-symbols-light:send-money" />
                    <div className=" text-18 text-[#788F99]">{dictionaryPayment.labels.depositMoney[locale]}</div>
                  </div>

                  <div className="w-full  max-w-320 flex flex-col gap-16 md:gap-24">
                    <div>
                      <div className="text-14 md:text-16 mb-6 text-[#6B7A87]">
                        {dictionaryPayment.labels.selectNetwork[locale]}
                      </div>
                      <CustomSelect
                        data={networkList}
                        init={networkList[network]}
                        onChange={(selected) => {
                          setNetwork(selected.id);
                          setCurrency(0);
                        }}
                        mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                        padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                        listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
                      ></CustomSelect>
                    </div>
                    <div>
                      <div className="text-14 md:text-16 mb-6 text-[#6B7A87]">
                        {dictionaryPayment.labels.selectCurrency[locale]}
                      </div>
                      <CustomSelect
                        data={currencyList}
                        init={currencyList[currency]}
                        onChange={(selected) => {
                          setCurrency(selected.id);
                        }}
                        mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                        padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                        listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
                        isIcon={true}
                      ></CustomSelect>
                    </div>
                    <div>
                      <AppInput
                        value={paymentAmount.value}
                        onChange={(e) => {
                          setPaymentAmount({ error: "", value: e });
                        }}
                        placeholder="0"
                        label={dictionaryWithdraw.requestModal.labels.amount[locale]}
                        error={paymentAmount.error}
                        pattern="^([0-9]+(?:[.][0-9]*)?)$"
                        inputMode="decimal"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleMakePayment}
                    className="w-full max-w-320 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                  >
                    {dictionaryPayment.buttons.continue[locale]}
                    <Icon icon={"octicon:arrow-right-16"} className="w-16 h-16" />
                  </button>
                </section>
              )}
            </main>
          )}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default DepositPage;
