import React, { useContext, useState } from "react";
import Modal from "react-modal";

import { ICurrency } from "@/@types/common";
import AppInput from "@/components/global/AppInput";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiRequestWithdraw } from "@/api/payment.api";
import toast from "react-hot-toast";
import { dictionaryWithdraw } from "@/config/dictionary";
import IconBox from "@/components/global/IconBox";
import AppCurrencySelect from "@/components/global/AppCurrencySelect";

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
      className="relative z-50 g-box-back w-full max-w-500  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-40 flex flex-col gap-32">
        <div className="flex items-start gap-12">
          <IconBox icon="mdi-light:credit-card" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">{dictionaryWithdraw.requestModal.title[locale]}</h4>
        </div>
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
              <button
              className="w-full max-w-500 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
              >
                {dictionaryWithdraw.requestModal.buttons.connectBank[locale]}
              </button>
            </Link>
          ) : (
            <button
            onClick={handleRequest}
            className="w-full max-w-500 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
            >
              {dictionaryWithdraw.requestModal.buttons.requestWithdraw[locale]}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RequestWithdrawModal;
