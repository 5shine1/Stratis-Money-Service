import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import { FIAT_CURRENCIES, ICurrency } from "@/@types/common";
// import useAppSelector from "@/hooks/global/useAppSelector";
import AppInput from "@/components/global/AppInput";
import AppTextArea from "@/components/global/AppTextArea";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppCurrencySelect from "@/components/global/AppCurrencySelect";
import { isValidEmail, isValidPhoneNumber, isValidReference } from "@/utils/string.utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: (amount: number, currencySymbol: string, description: string, payer: string) => void; //eslint-disable-line
  data: any;
};
const ControlModal: React.FC<Props> = ({ isOpen, onClose, onNext, data }) => {
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [currency, setCurrency] = useState<{ value: ICurrency | null; error: string }>({ value: null, error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [reference, setReference] = useState({ value: "", error: "" });
  const [payerEmail, setPayerEmail] = useState({ value: "", error: "" });
  const [payerPhone, setPayerPhone] = useState({ value: "", error: "" });
  // const { currencies } = useAppSelector((state) => state.payment);

  const handleClick = () => {
    let temp = 0;
    if (!amount.value) {
      temp++;
      setAmount({ ...amount, error: "Amount required." });
    }
    if (!currency.value) {
      temp++;
      setCurrency({ ...currency, error: "Currency required." });
    }
    if (!isValidReference(reference.value)) {
      temp++;
      setReference({ ...reference, error: "Invalid reference." });
    }
    if (!reference.value) {
      temp++;
      setReference({ ...reference, error: "Link reference required." });
    }
    if (!description.value) {
      temp++;
      setDescription({ ...description, error: "Description required." });
    }
    if (!isValidEmail(payerEmail.value)) {
      temp++;
      setPayerEmail({ ...payerEmail, error: "Invalid email." });
    }
    if (!payerEmail.value) {
      temp++;
      setPayerEmail({ ...payerEmail, error: "Payer info required." });
    }
    if (!isValidPhoneNumber(payerPhone.value)) {
      temp++;
      setPayerPhone({ ...payerPhone, error: "Invalid phone number." });
    }
    if (!payerPhone.value) {
      temp++;
      setPayerPhone({ ...payerPhone, error: "Payer info required." });
    }
    if (temp > 0) return;
    onNext(parseFloat(amount.value), currency.value.symbol, description.value, payerEmail.value);
  };

  useEffect(() => {
    if (data) {
      setAmount({ value: data.amount || "", error: "" });
      setDescription({ value: data.description || "", error: "" });
      setCurrency({ value: data.currency, error: "" });
      setPayerEmail({ value: data.payer || "", error: "" });
    }
  }, [data]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setAmount({ value: "", error: "" });
        setCurrency({ value: null, error: "" });
        setReference({ value: "", error: "" });
        setDescription({ value: "", error: "" });
        setPayerEmail({ value: "", error: "" });
        setPayerPhone({ value: "", error: "" });
      }}
      className="relative z-50  overflow-hidden bg-white dark:bg-primary-800 w-full max-w-560  rounded-12 shadow-md m-auto"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 flex flex-col gap-16 md:gap-32 bg-secondary-100/20 dark:bg-transparent">
        <h4 className="g-button-text w-fit pr-30">{data ? "Edit Detail" : "Generate New Link"}</h4>
        <div className="flex flex-col gap-16 md:gap-24">
          <AppInput
            value={amount.value}
            onChange={(e) => {
              setAmount({ error: "", value: e });
            }}
            placeholder="0.0"
            label="Amount"
            error={amount.error}
            pattern="^([0-9]+(?:[.,][0-9]*)?)$"
            inputMode="decimal"
          />
          <AppCurrencySelect
            data={FIAT_CURRENCIES}
            value={currency.value}
            placeholder="Select Currency"
            label="Currency"
            error={currency.error}
            onChange={(selected) => {
              setCurrency({ value: selected, error: "" });
            }}
          ></AppCurrencySelect>
          <AppInput
            value={reference.value}
            onChange={(e) => {
              setReference({ error: "", value: e });
            }}
            placeholder="Only numbers, letters and '-' symbol can be used"
            label="Link reference"
            error={reference.error}
            pattern="^[a-zA-Z0-9-]+$"
          />
          <AppTextArea
            value={description.value}
            onChange={(e) => {
              setDescription({ error: "", value: e });
            }}
            label="Description"
            placeholder="Your description here.."
            error={description.error}
          />
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <AppInput
              value={payerEmail.value}
              onChange={(e) => {
                setPayerEmail({ error: "", value: e });
              }}
              placeholder="Email address"
              label="Payer email"
              error={payerEmail.error}
            />
            <AppInput
              value={payerPhone.value}
              onChange={(e) => {
                setPayerPhone({ error: "", value: e });
              }}
              placeholder="Phone number"
              label="Payer phone number"
              error={payerPhone.error}
            />
          </div>
          <AnimatedSlideButton
            onClick={handleClick}
            className="text-primary-200 dark:text-white text-20 py-12 px-32 border border-primary-200 dark:border-secondary-300  rounded-full mt-8"
            backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
          >
            {data ? "Save" : "Generate"}
          </AnimatedSlideButton>
        </div>
      </div>
    </Modal>
  );
};

export default ControlModal;
