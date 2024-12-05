"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import { IPayment } from "@/@types/data";
import { apiPaymentHistoryDetail } from "@/api/payment.api";
import { ROLES } from "@/@types/common";
import { formattedTime } from "@/utils/string.utils";
import useAppSelector from "@/hooks/global/useAppSelector";
import { apiAdminPaymentHistoryDetail } from "@/api/admin.api";
import { dictionaryGlobal, dictionaryOrder } from "@/config/dictionary";

type Props = {
  params: {
    id: string;
  };
};
const OrderDetailPage: React.FC<Props> = ({ params }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const { role } = useAppSelector((state) => state.auth);
  const id = params.id;

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      if (role === ROLES.ADMIN) {
        const result = await apiAdminPaymentHistoryDetail(id);
        setPayment(result);
      } else {
        const result = await apiPaymentHistoryDetail(id);
        setPayment(result);
      }
    } catch (error) {
      toast.error(dictionaryOrder.orderDetail.messages.serverError[locale]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, [id]); // eslint-disable-line

  return (
    <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
      <h4 className="w-fit g-header-app">{dictionaryOrder.orderDetail.headings.transactionDetail[locale]}</h4>

      {isLoading ? (
        <div className="text-white/70 p-12 text-center">
          <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
        </div>
      ) : payment ? (
        <div className="flex flex-col gap-16">
          <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
            <div className="text-20 font-bold text-secondary-200">
              {dictionaryOrder.orderDetail.headings.summary[locale]}
            </div>
            <div className="flex flex-col gap-16 mt-18 text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.orderId[locale]}
                </span>
                {payment?.paymentId}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.orderLink[locale]}
                </span>
                <a
                  target="_blank"
                  href={`/payment/${payment?.paymentId}`}
                  className="u-transition-color hover:text-info"
                >
                  {window.location.origin}/payment/{payment?.paymentId}
                </a>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.amount[locale]}
                </span>
                <span>
                  {payment?.amount} <span className="opacity-60">{payment?.currency}</span>
                </span>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.createdAt[locale]}
                </span>
                <span>
                  {payment?.requested?.replace("T", " ").split(".")[0]}
                  &nbsp;&nbsp;&nbsp;
                  <span className="opacity-60">{formattedTime(payment?.requested, locale)}</span>
                </span>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.createdBy[locale]}
                </span>
                <span>
                  {role === ROLES.AGENT
                    ? "Me"
                    : payment.agentName || (role === ROLES.ADMIN ? payment.businessName : "Me")}

                  {payment.agentName && ` (${dictionaryOrder.agent[locale]})`}
                </span>
              </div>
            </div>
          </div>

          <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
            <div className="text-20 font-bold text-secondary-200">
              {dictionaryOrder.orderDetail.headings.description[locale]}
            </div>
            <div className=" mt-18 text-white">{payment?.description}</div>
          </div>

          <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
            <div className="text-20 font-bold text-secondary-200">
              {dictionaryOrder.orderDetail.headings.payerInfo[locale]}
            </div>
            <div className="flex flex-col gap-16 mt-18 text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                {payment?.payer ? (
                  <>
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryOrder.orderDetail.labels.email[locale]}
                    </span>
                    {payment?.payer}
                  </>
                ) : (
                  <span className="text-error">{dictionaryOrder.orderDetail.messages.na[locale]}</span>
                )}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.name[locale]}
                </span>
                {payment?.customerName ? (
                  <span> {payment?.customerName}</span>
                ) : (
                  <span className="text-error">{dictionaryOrder.orderDetail.messages.na[locale]}</span>
                )}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.address[locale]}
                </span>
                {payment?.customerAddress ? (
                  <span> {payment?.customerAddress}</span>
                ) : (
                  <span className="text-error">{dictionaryOrder.orderDetail.messages.na[locale]}</span>
                )}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.dob[locale]}
                </span>
                {payment?.customerDateOfBirth && payment?.customerDateOfBirth !== "0001-01-01T00:00:00" ? (
                  <span>{payment?.customerDateOfBirth?.split("T")[0]}</span>
                ) : (
                  <span className="text-error">{dictionaryOrder.orderDetail.messages.na[locale]}</span>
                )}
              </div>
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.pob[locale]}
                </span>
                {payment?.customerPlaceOfBirth ? (
                  <span> {payment?.customerPlaceOfBirth}</span>
                ) : (
                  <span className="text-error">{dictionaryOrder.orderDetail.messages.na[locale]}</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-24 md:p-32 rounded-8 bg-white/5 w-full">
            <div className="text-20 font-bold text-secondary-200">
              {dictionaryOrder.orderDetail.headings.transactionStatus[locale]}
            </div>
            <div className="flex flex-col gap-16 mt-18 text-white">
              <div className="flex gap-4 flex-col sm:flex-row break-all">
                <span className="opacity-60 text-white flex-none w-200">
                  {dictionaryOrder.orderDetail.labels.status[locale]}
                </span>
                {dictionaryGlobal.paymentStatus[locale][payment?.state] || "Error"}
              </div>
              {payment?.paymentAddress && (
                <>
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryOrder.orderDetail.labels.paymentAddress[locale]}
                    </span>
                    <span>{payment?.paymentAddress}</span>
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryOrder.orderDetail.labels.paymentAmount[locale]}
                    </span>
                    {payment?.paymentAmount} <span className="opacity-60">{payment?.paymentCurrency}</span>
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row break-all">
                    <span className="opacity-60 text-white flex-none w-200">
                      {dictionaryOrder.orderDetail.labels.transactionId[locale]}
                    </span>
                    <span>{payment?.paymentTransaction}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white/70">{dictionaryOrder.orderDetail.messages.error[locale]}</div>
      )}
    </div>
  );
};

export default OrderDetailPage;
