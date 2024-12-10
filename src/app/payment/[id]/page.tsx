"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import CustomSelect from "@/components/global/CustomSelect";
import { apiMakePayment, apiPaymentStart, apiPaymentStatus } from "@/api/payment.api";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { shortenString } from "@/utils/string.utils";
import { getChainInfo } from "@/utils/web3.utils";
import ProgressBar from "@/app/components/ProgressBar";
import IconBox from "@/components/global/IconBox";
import ChainLine from "./components/ChainLine";
import IconBoxSm from "@/components/global/IconBoxSm";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryPayment } from "@/config/dictionary";
import { setLocale } from "@/store/slices/locale.slice";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, bitgetWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, sepolia } from "viem/chains";
import ConnectButton from "@/app/components/ConnectButton";
import "@rainbow-me/rainbowkit/styles.css";
import { isMobile } from 'react-device-detect';

type Props = {
  params: {
    id: string;
  };
};

const PaymentPage: React.FC<Props> = ({ params }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const dispatch = useAppDispatch();
  const totalConfirmations = 6;
  const id = params.id;
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState(10);
  const [hash, setHash] = useState("");
  const [explorer, setExplorer] = useState("");
  const [currency, setCurrency] = useState(0);
  const [network, setNetwork] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [depositInfo, setDepositInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin2, setIsSpin2] = useState(false);
  const [isSpin3, setIsSpin3] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [paymentLinkData, setPaymentLinkData] = useState("");
  const [paymentAddress, setPaymentAddressa] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const currencyList = useMemo(
    () => currencies.filter((item, index, self) => index === self.findIndex((t) => t.text === item.text)),
    [currencies]
  );
  const networkList = useMemo(
    () =>
      currencies
        .filter((item) => {
          return item.text === currencyList[currency]?.text;
        })
        .map((item, id) => {
          return { ...item, id, text: item.chainName };
        }),
    [currencies, currency, currencyList]
  );

  const handleGetInfo = async () => {
    setIsLoading(true);
    try {
      const result = await apiPaymentStart(id);
      setPaymentInfo(result);
      if (result?.state === 200) setStatus(200);
      else if (result?.state === 55) setStatus(55);
      else if (result?.state === 5) setStatus(5);
      else setStatus(10);
      const response = await apiPaymentStatus(id);
      setHash(response.transactionHash);
      const explorer = await getChainInfo(response.chainId);
      setExplorer(explorer?.explorers[0]?.url);
    } catch (error) {
      toast.error(dictionaryPayment.toast.serverError[locale]);
    }
    setIsLoading(false);
  };

  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const selectedCurrency = paymentInfo.acceptableCurrencies.find(
        (item) => item.symbol === currencyList[currency].text && item.chainId === networkList[network].chainId
      );
      const result = await apiMakePayment(id, selectedCurrency.symbol, selectedCurrency.chainId);
      setDepositInfo(result);

      const link = !selectedCurrency
        ? result?.paymentDestination
        : selectedCurrency.isNative
        ? `ethereum:${result?.paymentDestination}@${result?.paymentChainId}?value=${result?.paymentAmount}e${
            result.decimals ?? 18
          }`
        : `ethereum:${selectedCurrency.tokenContract}@${result?.paymentChainId}/transfer?address=${
            result?.paymentDestination
          }&uint256=${result?.paymentAmount}e${result?.decimals ?? 18}`;
      setPaymentLinkData(link);
      setPaymentAddressa(result?.paymentDestination);
      setPaymentAmount(result?.paymentAmount);

      setStatus(60);
    } catch (error) {
      console.log(error);
      toast.error(dictionaryPayment.toast.serverError[locale]);
    }
    setLoading(false);
  };

  const handleGetStatus = async () => {
    if (status === 60) {
      const result = await apiPaymentStatus(id);
      if (result?.transactionHash) {
        setHash(result?.transactionHash);
        const explorer = await getChainInfo(result.chainId);
        setExplorer(explorer?.explorers[0]?.url);
      }
      setConfirmStep(result?.confirmations);
      if (result?.state === 55) {
        toast.error(dictionaryPayment.toast.transactionExpired[locale]);
        setStatus(55);
      } else if (result?.state === 100) {
        setIsSpin2(true);
      } else if (result?.state === 200) {
        setIsSpin3(true);
        toast.success(dictionaryPayment.toast.transactionCompleted[locale]);
        setStatus(200);
      }
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (paymentInfo?.acceptableCurrencies) {
        const currencyPromises = paymentInfo.acceptableCurrencies.map(async (item, i) => {
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

    fetchCurrencies();
  }, [paymentInfo?.acceptableCurrencies]);

  useEffect(() => {
    handleGetInfo();
  }, [id]); // eslint-disable-line

  useEffect(() => {
    const timer = setInterval(() => {
      handleGetStatus();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [status]); //eslint-disable-line

  const config = getDefaultConfig({
    appName: "masternode dAPP",
    projectId: "YOUR_PROJECT_ID",
    chains: [sepolia, mainnet],
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
        <RainbowKitProvider>
          {isLoading ? null : (
            <main className="overflow-x-hidden relative py-40 px-12 flex justify-between md:justify-center items-center h-full  min-h-screen m-auto flex-col gap-32 md:gap-60 w-full ">
              <Link href={"/"} className="flex flex-col md:flex-row items-center gap-16 justify-center">
                <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
                <h4 className="text-center">Stratis Money Service</h4>
              </Link>
              {status === 60 ? (
                //-------------deposite------------
                <section className="relative g-box-back rounded-20 border border-modal-border px-20 py-40 md:p-40 flex flex-col gap-40 w-full max-w-920 items-center">
                  <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1]"
                  />
                  <div className="relative flex items-start md:items-center gap-24 md:gap-12 w-full max-w-540  flex-col md:flex-row md:pb-50">
                    <div className="relative flex items-center gap-8">
                      <IconBox icon="lets-icons:check-ring" />
                      <span className="md:hidden text-14 text-[#BDCCD8]">{dictionaryPayment.status.requested[locale]}</span>
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

                      <span className="md:hidden text-14 text-[#BDCCD8]">{dictionaryPayment.status.received[locale]}</span>
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
                  {hash ? (
                    <div className="relative z-10 bg-[#031520B2] rounded-8 max-w-780 mx-auto w-full flex items-start md:items-end flex-col md:flex-row p-24 gap-24 justify-between">
                      <div className="flex flex-col gap-24 md:gap-40">
                        <div className="flex flex-col gap-6">
                          <span className="text-[#6B7A87] text-14">{dictionaryPayment.labels.transactionHash[locale]}</span>
                          <div className="font-medium text-[#BDCCD8] text-17 flex items-center gap-8">
                            <span className="hidden md:block">{shortenString(hash, 8, 6)}</span>
                            <span className="md:hidden">{shortenString(hash, 6, 4)}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(hash);
                                toast.success(dictionaryPayment.toast.copied[locale]);
                              }}
                            >
                              <IconBoxSm icon="ph:copy-light" />
                            </div>
                            <a href={`${explorer}/tx/${hash}`} target="_blank">
                              <IconBoxSm icon="octicon:link-external-24" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-280 w-full">
                        <ProgressBar
                          percentage={(confirmStep / totalConfirmations) * 100}
                          label={dictionaryPayment.labels.confirmations[locale]}
                          progress={`${confirmStep}/${totalConfirmations} (${Math.floor(
                            (confirmStep / totalConfirmations) * 100
                          )}%)`}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative z-10 bg-[#031520B2] rounded-8 max-w-780 mx-auto w-full flex items-start md:items-center flex-col md:flex-row p-24 gap-40 md:gap-24 justify-between">
                        <div className="flex flex-col gap-24 md:gap-40">
                          <div className="flex items-start flex-col md:flex-row gap-20 md:gap-40">
                            <div className="flex flex-col gap-6">
                              <span className="text-[#6B7A87] text-14">{dictionaryPayment.labels.network[locale]}</span>
                              <div className="font-medium text-[#BDCCD8] text-20 md:text-24">
                                {networkList[network].text}
                              </div>
                            </div>
                            <div className="flex flex-col gap-6">
                              <span className="text-[#6B7A87]  text-14">{dictionaryPayment.labels.amount[locale]}</span>
                              <div className="font-medium text-[#BDCCD8] text-20 md:text-24 flex items-center gap-8">
                                {depositInfo?.paymentAmount} {currencyList[currency].text}
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    navigator.clipboard.writeText(depositInfo?.paymentAmount);

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
                              <span className="hidden md:block">{depositInfo?.paymentDestination}</span>
                              <span className="md:hidden text-16 break-all">{depositInfo?.paymentDestination}</span>
                              <div
                                className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(depositInfo?.paymentDestination);
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
                            <div className="items-center p-10 mx-auto flex">                              
                              {isMobile
                                ? <button className="w-full max-w-320 text-button-text text-12 font-semibold py-12  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                                    onClick={() => {
                                      window.location.href = paymentLinkData;
                                    }}>
                                    Pay Now
                                  </button>
                                : <ConnectButton paymentDestination={paymentAddress} amount={paymentAmount} chain={networkList[network].chainId} /> } 
                            </div>
                        </div>
                      </div>
                      <div className="flex gap-12 items-start max-w-780 mx-auto w-full ">
                        <IconBoxSm
                          icon="carbon:warning"
                          borderColor="border-[#3D1414]"
                          backColor="bg-[#290D0D]"
                          textColor="text-[#BF5858]"
                        />
                        <p className="text-[#6B7A87] text-14 leading-[1.5]">{dictionaryPayment.labels.warning[locale]}</p>
                      </div>
                    </>
                  )}
                </section>
              ) : status === 200 ? (
                <section className="relative g-box-back rounded-20 border border-modal-border py-24 px-24 md:px-40 flex flex-col gap-32 w-full max-w-820 items-center">
                  <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1] hidden md:block"
                  />
                  <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                    <IconBox icon="lets-icons:check-ring" />
                    <div className="text-24 text-center g-button-text font-semibold">
                      {dictionaryPayment.transactionCompletedMessage[locale]}
                    </div>
                  </div>

                  <div className="relative bg-[#031520B2] rounded-8 flex items-start md:items-center gap-32 justify-between w-full p-20 flex-col md:flex-row">
                    <div className="text-18 text-[#DAE3EA] leading-[1.5] md:max-w-220">
                      {dictionaryPayment.paymentDetails.paid[locale]}{" "}
                      <span className="text-[#DEAD3D]">
                        {paymentInfo?.amount} {paymentInfo?.currencySymbol}
                      </span>{" "}
                      {dictionaryPayment.paymentDetails.to[locale]} {paymentInfo?.payeeName}
                    </div>
                    <div className="flex flex-col gap-6">
                      <span className="text-[#6B7A87] text-14"> {dictionaryPayment.labels.transactionHash[locale]}</span>
                      <div className="font-medium text-[#BDCCD8] text-17 flex items-center gap-8">
                        <span className="hidden md:block">{shortenString(hash, 8, 6)}</span>
                        <span className="md:hidden">{shortenString(hash, 6, 4)}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(hash);
                            toast.success(dictionaryPayment.toast.copied[locale]);
                          }}
                        >
                          <IconBoxSm icon="ph:copy-light" />
                        </div>
                        <a href={`${explorer}/tx/${hash}`} target="_blank">
                          <IconBoxSm icon="octicon:link-external-24" />
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              ) : status === 55 ? (
                <section className="relative g-box-back rounded-20 border border-modal-border py-24 px-24 md:px-40 flex flex-col gap-40 w-full max-w-820 items-center overflow-hidden">
                  <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1] hidden md:block"
                  />
                  <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                    <IconBox icon="carbon:warning" />
                    <div className="text-24 text-center g-button-text font-semibold">
                      {dictionaryPayment.status.expired[locale]}
                    </div>
                  </div>
                  <Link href={"/"} className="flex items-center gap-8 text-[#DDAC3E]">
                    <Icon icon={"octicon:arrow-left-16"} className="w-16 h-16" />
                    {dictionaryPayment.buttons.goBack[locale]}
                  </Link>
                </section>
              ) : status === 5 ? (
                <section className="relative g-box-back rounded-20 border border-modal-border py-24 px-24 md:px-40 flex flex-col gap-40 w-full max-w-820 items-center overflow-hidden">
                  <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1] hidden md:block"
                  />
                  <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                    <IconBox icon="carbon:warning" />
                    <div className="text-24 text-center g-button-text font-semibold">
                      {dictionaryPayment.status.cancelled[locale]}
                    </div>
                  </div>
                  <Link href={"/"} className="flex items-center gap-8 text-[#DDAC3E]">
                    <Icon icon={"octicon:arrow-left-16"} className="w-16 h-16" />
                    {dictionaryPayment.buttons.goBack[locale]}
                  </Link>
                </section>
              ) : (
                // ----------------init payment-----------------
                <section className="relative g-box-back rounded-20 border border-modal-border p-20 md:p-24 flex flex-col gap-32 w-full max-w-820 items-center">
                  <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                  <img
                    src="/assets/global/back_pattern.png"
                    draggable={false}
                    alt=""
                    className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1] hidden md:block"
                  />
                  <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                    <IconBox icon="iconoir:open-in-window" />
                    <div className="text-20 md:text-24 text-center text-[#DAE3EA] font-semibold">
                      <span>{paymentInfo?.payeeName} </span>
                      <span className="text-[#788F99]">
                        {dictionaryPayment.paymentDescription.hasRequested[locale]}
                      </span>{" "}
                      <span>{paymentInfo?.customerName}</span>{" "}
                      <span className="text-[#788F99]">{dictionaryPayment.paymentDescription.toPay[locale]}</span>{" "}
                      {paymentInfo?.amount} {paymentInfo?.currencySymbol}.
                    </div>
                    <div className=" text-18 text-[#788F99]">{paymentInfo?.description}</div>
                  </div>

                  <div className="w-full  max-w-320 flex flex-col gap-16 md:gap-24">
                    <div>
                      <div className="text-14 md:text-16 mb-6 text-[#6B7A87]">
                        {dictionaryPayment.labels.selectCurrency[locale]}
                      </div>
                      <CustomSelect
                        data={currencyList}
                        init={currencyList[currency]}
                        onChange={(selected) => {
                          setCurrency(selected.id);
                          setNetwork(0);
                        }}
                        mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                        padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                        listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
                        isIcon={true}
                      ></CustomSelect>
                    </div>
                    <div>
                      <div className="text-14 md:text-16 mb-6 text-[#6B7A87]">
                        {dictionaryPayment.labels.selectNetwork[locale]}
                      </div>
                      <CustomSelect
                        data={networkList}
                        init={networkList[network]}
                        onChange={(selected) => {
                          setNetwork(selected.id);
                        }}
                        mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                        padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                        listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
                      ></CustomSelect>
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
              <div className="text-14 flex items-center text-input-text border border-modal-border g-box-back p-12 rounded-6 gap-8">
                <div
                  className={`cursor-pointer ${locale === "EN" ? "text-secondary-400" : "hover:text-white"}`}
                  onClick={() => dispatch(setLocale("EN"))}
                >
                  EN
                </div>
                <hr className="rotate-90 w-16" />
                <div
                  className={`cursor-pointer ${locale === "ES" ? "text-secondary-400" : "hover:text-white"}`}
                  onClick={() => dispatch(setLocale("ES"))}
                >
                  ES
                </div>
                <hr className="rotate-90 w-16" />
                <div
                  className={`cursor-pointer ${locale === "FR" ? "text-secondary-400" : "hover:text-white"}`}
                  onClick={() => dispatch(setLocale("EN"))}
                >
                  FR
                </div>
              </div>
            </main>
          )}
      
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default PaymentPage;
