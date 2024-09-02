import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import { ICurrency } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";
import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppCurrencySelect from "@/components/global/AppCurrencySelect";
import { isValidEmail } from "@/utils/string.utils";
import DatePicker from "@/components/global/DatePicker";
import AppCheckbox from "@/components/global/AppCheckbox";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: (
    amount: number, //eslint-disable-line
    currencySymbol: string, //eslint-disable-line
    description: string, //eslint-disable-line
    payer: string, //eslint-disable-line
    payerName: string, //eslint-disable-line
    payerAddress: string, //eslint-disable-line
    payerDOB: string, //eslint-disable-line
    payerPOB: string //eslint-disable-line
  ) => void;
  data: any;
};
const ControlModal: React.FC<Props> = ({ isOpen, onClose, onNext, data }) => {
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [currency, setCurrency] = useState<{ value: ICurrency | null; error: string }>({ value: null, error: "" });
  const [reference, setReference] = useState({ value: "", error: "" });
  const [payerEmail, setPayerEmail] = useState({ value: "", error: "" });
  const { currencies } = useAppSelector((state) => state.payment);
  const [payerName, setPayerName] = useState({ value: "", error: "" });
  const [payerAddress, setPayerAddress] = useState({ value: "", error: "" });
  const [payerDOB, setPayerDOB] = useState({ value: null, error: "" });
  const [payerPOB, setPayerPOB] = useState({ value: "", error: "" });
  const [isAcceptable, setIsAcceptable] = useState(false);
  const [acceptableCurrency, setAcceptableCurrency] = useState<{ value: ICurrency | null; error: string }>({
    value: null,
    error: "",
  });

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
    if (!reference.value) {
      temp++;
      setReference({ ...reference, error: "Link reference required." });
    }

    if (!isValidEmail(payerEmail.value)) {
      temp++;
      setPayerEmail({ ...payerEmail, error: "Invalid email." });
    }
    if (!payerEmail.value) {
      temp++;
      setPayerEmail({ ...payerEmail, error: "This field required." });
    }
    if (!payerName.value) {
      temp++;
      setPayerName({ ...payerName, error: "This field required." });
    }
    if (!payerAddress.value) {
      temp++;
      setPayerAddress({ ...payerAddress, error: "This field required." });
    }
    if (!payerDOB.value) {
      temp++;
      setPayerDOB({ ...payerDOB, error: "This field required." });
    }
    if (!payerPOB.value) {
      temp++;
      setPayerPOB({ ...payerPOB, error: "This field required." });
    }
    if (temp > 0) return;
    onNext(
      parseFloat(amount.value),
      currency.value.symbol,
      reference.value,
      payerEmail.value,
      payerName.value,
      payerAddress.value,
      payerDOB.value,
      payerPOB.value
    );
  };

  useEffect(() => {
    if (data) {
      setAmount({ value: data.amount || "", error: "" });
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
        setPayerEmail({ value: "", error: "" });
        setPayerAddress({ value: "", error: "" });
        setPayerName({ value: "", error: "" });
        setPayerDOB({ value: null, error: "" });
        setPayerPOB({ value: "", error: "" });
        setIsAcceptable(false);
        setAcceptableCurrency({ value: null, error: "" });
      }}
      className="relative z-50 bg-white dark:bg-primary-800 w-full max-w-640  rounded-12 shadow-md m-auto"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 flex flex-col gap-16 md:gap-32 bg-secondary-100/20 dark:bg-transparent">
        <h4 className="g-button-text w-fit pr-30">{data ? "Edit Detail" : "Generate New Order Link"}</h4>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <AppInput
              value={amount.value}
              onChange={(e) => {
                setAmount({ error: "", value: e });
              }}
              placeholder="0"
              label="Amount"
              error={amount.error}
              pattern="^([0-9]+(?:[.,][0-9]*)?)$"
              inputMode="decimal"
            />
            <AppCurrencySelect
              data={currencies}
              value={currency.value}
              placeholder="Select Currency"
              label="Currency"
              error={currency.error}
              onChange={(selected) => {
                setCurrency({ value: selected, error: "" });
              }}
            ></AppCurrencySelect>
          </div>
          <AppInput
            value={reference.value}
            onChange={(e) => {
              setReference({ error: "", value: e });
            }}
            placeholder="Reference"
            label="Order Reference"
            error={reference.error}
            pattern="^[a-zA-Z0-9-]+$"
          />
          <AppInput
            value={payerEmail.value}
            onChange={(e) => {
              setPayerEmail({ error: "", value: e });
            }}
            placeholder="Email address"
            label="Customer Email"
            error={payerEmail.error}
          />
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <AppInput
              value={payerName.value}
              onChange={(e) => {
                setPayerName({ error: "", value: e });
              }}
              placeholder="Customer Name"
              label="Customer Name"
              error={payerName.error}
            />
            <AppInput
              value={payerAddress.value}
              onChange={(e) => {
                setPayerAddress({ error: "", value: e });
              }}
              placeholder="Customer Address"
              label="Customer Address"
              error={payerAddress.error}
            />
          </div>
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <div className="w-full flex flex-col gap-4">
              <span className="text-primary-500/60 dark:text-white/50 text-14">Customer Date of Birth</span>
              <DatePicker
                selectedDate={payerDOB.value}
                setSelectedDate={(d) => setPayerDOB({ error: "", value: d })}
                error={payerDOB.error}
              />
              {payerDOB.error && <span className="text-error text-12 mx-6">{payerDOB.error}</span>}
            </div>
            <AppInput
              value={payerPOB.value}
              onChange={(e) => {
                setPayerPOB({ error: "", value: e });
              }}
              placeholder="Customer Place of Birth"
              label="Customer Place of Birth"
              error={payerPOB.error}
            />
          </div>
          <AppCheckbox
            label="Choose one acceptable currency"
            value={isAcceptable}
            onChange={() => {
              setIsAcceptable(!isAcceptable);
            }}
          />
          {isAcceptable && (
            <AppCurrencySelect
              data={currencies}
              value={acceptableCurrency.value}
              placeholder="Select Acceptable Currency"
              label="Acceptable"
              error={acceptableCurrency.error}
              onChange={(selected) => {
                setAcceptableCurrency({ value: selected, error: "" });
              }}
            ></AppCurrencySelect>
          )}
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
