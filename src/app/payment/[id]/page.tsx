"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import SvgLogoApp from "@/assets/SvgLogoApp";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomSelect from "@/components/global/CustomSelect";
import { apiMakePayment, apiPaymentStart, apiPaymentStatus } from "@/api/payment.api";
import Error404Page from "@/app/not-found";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { shortenAddress, shortenString } from "@/utils/string.utils";

type Props = {
  params: {
    id: string;
  };
};

const PaymentPage: React.FC<Props> = ({ params }) => {
  const { setLoading } = useContext(LoadingContext);
  const [status, setStatus] = useState(10);
  const [hash, setHash] = useState("");
  const [currency, setCurrency] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [depositInfo, setDepositInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin2, setIsSpin2] = useState(false);
  const [isSpin3, setIsSpin3] = useState(false);
  const id = params.id;
  const currencies = useMemo(
    () =>
      paymentInfo?.acceptableCurrencies?.map((item, i) => {
        return { id: i, key: item?.currencyId, text: item?.symbol };
      }),
    [paymentInfo?.acceptableCurrencies]
  );

  const handleGetInfo = async () => {
    setIsLoading(true);
    try {
      const result = await apiPaymentStart(id);
      setPaymentInfo(result);
      setStatus(10);
    } catch (error) {
      console.log(error);
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const result = await apiMakePayment(id, currencies[currency].text);
      setDepositInfo(result);
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
      if (result?.transactionHash) setHash(result?.transactionHash);
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
          <div className="g-effect absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] scale-50 lg:scale-100 -z-10"></div>
          <div className="flex flex-col gap-32">
            <Link href={"/"} className="flex items-center gap-16 justify-center">
              <SvgLogoApp className="w-48 h-48 !fill-secondary-200" />{" "}
              <h4 className="hidden sm:block">Stratis Payment</h4>
            </Link>
            {status !== 60 ? (
              <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col md:flex-row gap-32 w-full max-w-1000">
                <div className="flex flex-col items-start gap-24">
                  {status == 200 && (
                    <div className="border border-success text-success bg-success/5 rounded-6 p-12 text-center w-fit">
                      This transaction already processed.
                    </div>
                  )}
                  {status == 55 && (
                    <div className="border border-error text-error bg-error/5 rounded-6 p-12 text-center w-fit">
                      This transaction was expired.
                    </div>
                  )}
                  <div className="text-24 break-words">
                    <span className="break-all md:break-normal">{paymentInfo?.payeeName} </span>
                    <span className="text-white/50">has requested</span>{" "}
                    <span className="break-all md:break-normal">{paymentInfo?.payer}</span>{" "}
                    <span className="text-white/50">to pay</span> {paymentInfo?.amount} {paymentInfo?.currencySymbol}.
                  </div>
                  <div className=" text-16 text-white/60">{paymentInfo?.description}</div>
                </div>
                <div className="w-full max-w-360 flex flex-col gap-24">
                  <div>
                    <div className="mb-4">Select currency you want to pay</div>
                    <CustomSelect
                      data={currencies}
                      init={currencies[currency]}
                      onChange={(selected) => {
                        setCurrency(selected.id);
                      }}
                      mainClass="border border-secondary-200 bg-secondary-200/10 rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                      padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-secondary-200/20 flex flex-col gap-4 overflow-y-auto backdrop-blur-md z-10 p-8"
                      listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
                    ></CustomSelect>
                  </div>
                  <div className="flex flex-col gap-16">
                    {status === 200 || status === 55 ? (
                      <div className=" text-20 border border-white/50 text-white/50 text-center rounded-full py-16 px-48 cursor-not-allowed">
                        Continue
                      </div>
                    ) : (
                      <AnimatedSlideButton
                        onClick={() => {
                          handleMakePayment();
                        }}
                        className=" text-20 border border-secondary-300 rounded-full py-16 px-48"
                      >
                        Continue
                      </AnimatedSlideButton>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-12 px-16 md:px-40 py-32 md:py-48 flex flex-col gap-32 w-full max-w-1000">
                <div className="flex gap-24  items-start flex-col md:flex-row">
                  <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-4">
                      <span className="text-white/70">Amount</span>
                      <div className="flex items-center gap-8">
                        <span className="text-24 font-bold">
                          {depositInfo?.paymentAmount} {currencies[currency].text}
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(depositInfo?.paymentAmount);

                            toast.success("Copied amount.");
                          }}
                        >
                          <Icon icon={"fluent-mdl2:copy"} className="w-16 h-16" />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-8">
                      <span className="text-white/70">Deposit Address</span>
                      <div className="flex gap-8 items-center">
                        <span className="text-18 font-bold hidden md:block">{depositInfo?.paymentDestination}</span>
                        <span className="text-18 font-bold md:hidden">
                          {shortenAddress(depositInfo?.paymentDestination || "")}
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(depositInfo?.paymentDestination);
                            toast.success("Copied deposit address.");
                          }}
                        >
                          <Icon icon={"fluent-mdl2:copy"} className="w-16 h-16" />
                        </span>
                      </div>
                    </div>
                    <p className="text-error mt-12 text-14">
                      Be careful when choosing a network and currency when sending cryptocurrency. If you send
                      cryptocurrency over the wrong network or wrong currency, then your money will not be credited or
                      returned.
                    </p>
                    {hash && (
                      <div className="flex flex-col gap-8">
                        <span className="text-white/70">Transaction Hash</span>
                        <div className="flex gap-8 items-center">
                          <span className="text-18 font-bold hidden md:block">{shortenString(hash, 8, 6)}</span>
                          <span className="text-18 font-bold md:hidden">{shortenString(hash, 4, 4)}</span>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(hash);
                              toast.success("Copied transaction hash.");
                            }}
                          >
                            <Icon icon={"fluent-mdl2:copy"} className="w-16 h-16" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`w-full max-w-300 `}>
                    {!hash && (
                      <div className="border-4 border-secondary-200">
                        <QRCode
                          value={depositInfo?.paymentDestination}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-start md:items-center gap-24 md:gap-4 w-full max-w-600 mx-auto py-24 flex-col md:flex-row">
                  <div className="relative flex items-center gap-8">
                    <Icon icon={"lets-icons:check-ring"} className="w-32 h-32 flex-none text-success" />
                    <span className="md:hidden text-14">Payment is requested</span>
                    <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4 hidden md:block">
                      Payment is requested
                    </span>
                  </div>
                  <hr className="border-white/30 w-full hidden md:block" />
                  <div className="relative flex items-center gap-8">
                    {isSpin2 ? (
                      <Icon icon={"lets-icons:check-ring"} className="w-32 h-32 flex-none text-success" />
                    ) : (
                      <Icon icon={"eos-icons:loading"} className="w-32 h-32 flex-none" />
                    )}
                    <span className="md:hidden text-14">Payment is received, awaiting confirmation</span>
                    <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4 hidden md:block">
                      Payment is received, awaiting confirmation
                    </span>
                  </div>
                  <hr className="border-white/30 w-full hidden md:block" />
                  <div className="relative flex items-center gap-8">
                    {isSpin3 ? (
                      <Icon icon={"lets-icons:check-ring"} className="w-32 h-32 flex-none text-success" />
                    ) : (
                      <Icon icon={"eos-icons:loading"} className="w-32 h-32 flex-none" />
                    )}{" "}
                    <span className="md:hidden text-14">Payment completed</span>
                    <span className="absolute left-1/2 text-12 whitespace-nowrap -translate-x-1/2 top-full mt-4 hidden md:block">
                      Payment completed
                    </span>
                  </div>
                </div>
              </div>
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
