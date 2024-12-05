import React, { useContext, useState } from "react";
import Modal from "react-modal";

import { ICurrency } from "@/@types/common";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppCurrencySelect from "@/components/global/AppCurrencySelect";
import AppInput from "@/components/global/AppInput";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiRequestWithdraw } from "@/api/payment.api";
import toast from "react-hot-toast";
import { dictionaryWithdraw } from "@/config/dictionary";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const RequestWithdrawModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const { setLoading } = useContext(LoadingContext);
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [currency, setCurrency] = useState<{ value: ICurrency | null; error: string }>({ value: null, error: "" });
  const { currencies } = useAppSelector((state) => state.payment);
  const { bankAccountHolder } = useAppSelector((state) => state.setting);
  const auth = useAppSelector((state) => state.auth);

  const handleRequest = async () => {
    if (!currency.value) {
      setCurrency({ ...currency, error: dictionaryWithdraw.requestModal.errors.currencyRequired[locale] });
      return;
    }
    if (!parseFloat(amount.value)) {
      setAmount({ ...amount, error: dictionaryWithdraw.requestModal.errors.amountRequired[locale] });
      return;
    }
    if (auth?.totalBalance[currency.value.symbol] < parseFloat(amount.value)) {
      setAmount({ ...amount, error: dictionaryWithdraw.requestModal.errors.insufficientBalance[locale] });
      return;
    }

    setLoading(true);
    try {
      await apiRequestWithdraw(currency?.value?.symbol, parseFloat(amount.value));
      toast.success(dictionaryWithdraw.requestModal.messages.withdrawSuccess[locale]);
      onClose();
    } catch (error) {
      toast.error(dictionaryWithdraw.requestModal.errors.somethingWrong[locale]);
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setAmount({ value: "", error: "" });
        setCurrency({ value: null, error: "" });
      }}
      className="relative z-50 overflow-hidden bg-primary-800 w-full max-w-480 p-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="flex flex-col gap-32">
        <h4 className="g-button-text w-fit pr-30">{dictionaryWithdraw.requestModal.title[locale]}</h4>
        <div className="flex flex-col gap-16">
          <AppCurrencySelect
            data={currencies}
            value={currency.value}
            placeholder={dictionaryWithdraw.requestModal.placeholders.selectCurrency[locale]}
            label={dictionaryWithdraw.requestModal.labels.currency[locale]}
            error={currency.error}
            onChange={(selected) => {
              setCurrency({ value: selected, error: "" });
            }}
          ></AppCurrencySelect>
          <AppInput
            value={amount.value}
            onChange={(e) => {
              setAmount({ error: "", value: e });
            }}
            placeholder="0"
            label={dictionaryWithdraw.requestModal.labels.amount[locale]}
            error={amount.error}
            pattern="^([0-9]+(?:[.][0-9]*)?)$"
            inputMode="decimal"
          />
          {!bankAccountHolder && (
            <div className="text-14 text-error border border-error rounded-6 p-12 bg-error/10 flex gap-6 items-center">
              <Icon icon={"iconoir:warning-circle"} className="text-20" />
              {dictionaryWithdraw.requestModal.errors.connectBank[locale]}
            </div>
          )}
          {!bankAccountHolder ? (
            <Link href={"/app/account"} className="w-full">
              <AnimatedSlideButton
                className="w-full text-white text-20 py-12 px-32 border border-secondary-300  rounded-full mt-8"
                backClassName="from-primary-400 to-secondary-300 "
              >
                {dictionaryWithdraw.requestModal.buttons.connectBank[locale]}
              </AnimatedSlideButton>
            </Link>
          ) : (
            <AnimatedSlideButton
              onClick={handleRequest}
              className="text-white text-20 py-12 px-32 border border-secondary-300  rounded-full mt-8"
              backClassName="from-primary-400 to-secondary-300 "
            >
              {dictionaryWithdraw.requestModal.buttons.requestWithdraw[locale]}
            </AnimatedSlideButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RequestWithdrawModal;
