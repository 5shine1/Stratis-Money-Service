"use client";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import CustomSelect from "@/components/global/CustomSelect";
import { apiMakePayment, apiPaymentStart, apiPaymentStatus } from "@/api/payment.api";
import Error404Page from "@/app/not-found";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { shortenAddress, shortenString } from "@/utils/string.utils";
import { getChainInfo } from "@/utils/web3.utils";
import ProgressBar from "@/app/components/ProgressBar";
import IconBox from "@/components/global/IconBox";
import ChainLine from "./components/ChainLine";
import IconBoxSm from "@/components/global/IconBoxSm";

type Props = {
  params: {
    id: string;
  };
};

const PaymentPage: React.FC<Props> = ({ params }) => {
  const totalConfirmations = 6;
  const id = params.id;
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState(10);
  const [hash, setHash] = useState("");
  const [explorer, setExplorer] = useState("");
  const [currency, setCurrency] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [depositInfo, setDepositInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin2, setIsSpin2] = useState(false);
  const [isSpin3, setIsSpin3] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [paymentLinkData, setPaymentLinkData] = useState("");

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
            subtext: chain.name,
          };
        });
        const resolvedCurrencies = await Promise.all(currencyPromises);
        setCurrencies(resolvedCurrencies);
      }
    };

    fetchCurrencies();
  }, [paymentInfo?.acceptableCurrencies]);

  const handleGetInfo = async () => {
    setIsLoading(true);
    try {
      const result = await apiPaymentStart(id);
      setPaymentInfo(result);
      if (result?.state === 200) setStatus(200);
      else setStatus(10);
      const response = await apiPaymentStatus(id);
      setHash(response.transactionHash);
      const explorer = await getChainInfo(response.chainId);
      setExplorer(explorer?.explorers[0]?.url);
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const result = await apiMakePayment(id, currencies[currency].text);
      setDepositInfo(result);

      const selectedCurrency = paymentInfo.acceptableCurrencies.find(
        (item) => item.currencyId === currencies[currency].key
      );

      const link = !selectedCurrency
        ? result?.paymentDestination
        : `ethereum:${selectedCurrency.tokenContract}@${selectedCurrency.chainId}/transfer?address=${result?.paymentDestination}&uint256=${paymentInfo?.amount}e18`;

      setPaymentLinkData(link);

      setStatus(60);
    } catch (error) {
      console.log(error);
      toast.error("Server error.");
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
      console.log(result?.state);
      if (result?.state === 55) {
        toast.error("This transaction has been expired.");
        setStatus(55);
      } else if (result?.state === 100) {
        setIsSpin2(true);
      } else if (result?.state === 200) {
        setIsSpin3(true);
        toast.success("Transaction completed successfully.");
        setStatus(200);
      }
    }
  };

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

  return (
    <>
      {isLoading ? null : paymentInfo ? (
        <main className="overflow-x-hidden relative py-40 px-12 flex justify-center items-center min-h-[100vh] m-auto">
          <div className="flex flex-col gap-32 md:gap-60 w-full items-center">
            <Link href={"/"} className="flex items-center gap-16 justify-center">
              <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
              <h4 className="hidden sm:block">Stratis Money Service</h4>
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
                    <span className="md:hidden text-14 text-[#BDCCD8]">Payment is requested</span>
                    <span className="absolute left-1/2 text-14 whitespace-nowrap -translate-x-1/2 top-full mt-12 hidden md:block text-[#BDCCD8]">
                      Payment is requested
                    </span>
                  </div>
                  <ChainLine />
                  <div className="relative flex items-center gap-8">
                    <IconBox
                      icon={isSpin2 ? "lets-icons:check-ring" : "eos-icons:loading"}
                      className={`w-24 h-24 ${isSpin2 ? "text-secondary-main" : "text-[#516972]"}`}
                    />

                    <span className="md:hidden text-14 text-[#BDCCD8]">Payment is received, awaiting confirmation</span>
                    <span className="absolute left-1/2 text-14 whitespace-nowrap -translate-x-1/2 top-full mt-12 hidden md:block text-[#BDCCD8]">
                      Payment is received, <br /> awaiting confirmation
                    </span>
                  </div>
                  <ChainLine />
                  <div className="relative flex items-center gap-8">
                    <IconBox
                      icon={isSpin3 ? "lets-icons:check-ring" : "eos-icons:loading"}
                      className={`w-24 h-24 ${isSpin3 ? "text-secondary-main" : "text-[#516972]"}`}
                    />
                    <span className="md:hidden text-14  text-[#BDCCD8]">
                      Payment completed ({confirmStep}/{totalConfirmations})
                    </span>
                    <span className="absolute left-1/2 text-14 whitespace-nowrap -translate-x-1/2 top-full mt-12 hidden md:block  text-[#BDCCD8]">
                      Payment completed ({confirmStep}/{totalConfirmations})
                    </span>
                  </div>
                </div>
                {hash ? (
                  <div className="relative z-10 bg-[#031520B2] rounded-8 max-w-780 mx-auto w-full flex items-start md:items-end flex-col md:flex-row p-24 gap-24 justify-between">
                    <div className="flex flex-col gap-24 md:gap-40">
                      <div className="flex flex-col gap-6">
                        <span className="text-[#6B7A87] text-14">Transaction Hash</span>
                        <div className="font-medium text-[#BDCCD8] text-17 flex items-center gap-8">
                          <span className="hidden md:block">{shortenString(hash, 8, 6)}</span>
                          <span className="md:hidden">{shortenString(hash, 6, 4)}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(hash);
                              toast.success("Copied amount.");
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
                        label="Confirmations"
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
                        <div className="flex items-start flex-col md:flex-row gap-24 md:gap-40">
                          <div className="flex flex-col gap-6">
                            <span className="text-[#6B7A87] text-14">Network</span>
                            <div className="font-medium text-[#BDCCD8] text-24">{currencies[currency].subtext}</div>
                          </div>
                          <div className="flex flex-col gap-6">
                            <span className="text-[#6B7A87]  text-14">Amount</span>
                            <div className="font-medium text-[#BDCCD8] text-24 flex items-center gap-8">
                              {depositInfo?.paymentAmount} {currencies[currency].text}
                              <div
                                className="cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(depositInfo?.paymentAmount);

                                  toast.success("Copied amount.");
                                }}
                              >
                                <IconBoxSm icon="ph:copy-light" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-6">
                          <span className="text-[#6B7A87]  text-14">Deposit Address</span>
                          <div className="font-medium text-[#BDCCD8] text-17 flex items-center gap-8">
                            <span className="hidden md:block">{depositInfo?.paymentDestination}</span>
                            <span className="md:hidden text-24">{shortenAddress(depositInfo?.paymentDestination)}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(depositInfo?.paymentDestination);
                                toast.success("Copied amount.");
                              }}
                            >
                              <IconBoxSm icon="ph:copy-light" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-8 w-full max-w-280 sm:max-w-180 aspect-square">
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
                    <div className="flex gap-12 items-start max-w-780 mx-auto w-full ">
                      <IconBoxSm
                        icon="carbon:warning"
                        borderColor="border-[#3D1414]"
                        backColor="bg-[#290D0D]"
                        textColor="text-[#BF5858]"
                      />
                      <p className="text-[#6B7A87] text-14">
                        Be careful when choosing a network and currency when sending cryptocurrency. If you send
                        cryptocurrency over the wrong network or wrong currency, then your money will not be credited or
                        returned.
                      </p>
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
                  className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1]"
                />
                <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                  <IconBox icon="lets-icons:check-ring" />
                  <div className="text-24 text-center g-button-text font-semibold">
                    Transaction has been completed successfully!
                  </div>
                </div>

                <div className="relative bg-[#031520B2] rounded-8 flex items-start md:items-center gap-32 justify-between w-full p-20 flex-col md:flex-row">
                  <div className="text-18 text-[#DAE3EA] leading-[1.5] md:max-w-220">
                    You have paid{" "}
                    <span className="text-[#DEAD3D]">
                      {paymentInfo?.amount} {paymentInfo?.currencySymbol}
                    </span>{" "}
                    to {paymentInfo?.payeeName}
                  </div>
                  <div className="flex flex-col gap-6">
                    <span className="text-[#6B7A87] text-14">Transaction Hash</span>
                    <div className="font-medium text-[#BDCCD8] text-17 flex items-center gap-8">
                      <span className="hidden md:block">{shortenString(hash, 8, 6)}</span>
                      <span className="md:hidden">{shortenString(hash, 6, 4)}</span>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(hash);
                          toast.success("Copied amount.");
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
            ) : (
              // ----------------init payment-----------------
              <section className="relative g-box-back rounded-20 border border-modal-border p-24 flex flex-col gap-32 w-full max-w-820 items-center">
                <img src="/assets/global/back_pattern.png" draggable={false} alt="" className="absolute left-0 top-0" />
                <img
                  src="/assets/global/back_pattern.png"
                  draggable={false}
                  alt=""
                  className="absolute bottom-0 right-0 scale-y-[-1] scale-x-[-1]"
                />
                <div className="relative max-w-540 w-full flex items-center flex-col gap-12">
                  <IconBox icon="iconoir:open-in-window" />
                  <div className="text-24 text-center text-[#DAE3EA] font-semibold">
                    <span className="break-all md:break-normal">{paymentInfo?.payeeName} </span>
                    <span className="text-[#788F99]">has requested</span>{" "}
                    <span className="break-all md:break-normal">{paymentInfo?.customerName}</span>{" "}
                    <span className="text-[#788F99]">to pay</span> {paymentInfo?.amount} {paymentInfo?.currencySymbol}.
                  </div>
                  <div className=" text-18 text-[#788F99]">{paymentInfo?.description}</div>
                </div>

                <div className="w-full  max-w-320 flex flex-col gap-24">
                  <div>
                    <div className="mb-6 text-[#6B7A87]">Select currency you want to pay</div>
                    <CustomSelect
                      data={currencies}
                      init={currencies[currency]}
                      onChange={(selected) => {
                        setCurrency(selected.id);
                      }}
                      mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                      padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-secondary-200/20 flex flex-col gap-4 overflow-y-auto backdrop-blur-md z-10 p-8"
                      listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
                      isIcon={true}
                    ></CustomSelect>
                  </div>
                  <div>
                    <div className="mb-6 text-[#6B7A87]">Select Network</div>
                    <CustomSelect
                      data={currencies}
                      init={currencies[currency]}
                      onChange={(selected) => {
                        setCurrency(selected.id);
                      }}
                      mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                      padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-secondary-200/20 flex flex-col gap-4 overflow-y-auto backdrop-blur-md z-10 p-8"
                      listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
                      isIcon={true}
                    ></CustomSelect>
                  </div>
                </div>

                <button
                  onClick={handleMakePayment}
                  className="w-full max-w-320 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
                >
                  Continue
                  <Icon icon={"octicon:arrow-right-16"} className="w-16 h-16" />
                </button>
              </section>
            )}
          </div>
        </main>
      ) : (
        <Error404Page />
      )}
    </>
  );
};

export default PaymentPage;
