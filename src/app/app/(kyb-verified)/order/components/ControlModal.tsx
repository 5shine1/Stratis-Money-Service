import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import { ICurrency } from "@/@types/common";
import useAppSelector from "@/hooks/global/useAppSelector";
import AppInput from "@/components/global/AppInput";
import { isValidEmail } from "@/utils/string.utils";
import DatePicker from "@/components/global/DatePicker";
import IconBox from "@/components/global/IconBox";
import CurrencyInputSelect from "@/components/global/CurrencyInputSelect";
import { dictionaryOrder } from "@/config/dictionary";
import LanguageSelect from "@/components/global/AppLanguageSelect";
import Link from "next/link";

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
    payerPOB: string, //eslint-disable-line
    language: string //eslint-disable-line
  ) => void;
};
const ControlModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const { currencies } = useAppSelector((state) => state.payment);
  const { acceptNonStablecoinPayments } = useAppSelector((state) => state.setting);
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [language, setLanguage] = useState({ value: locale, error: "" });
  const [currency, setCurrency] = useState<{ value: ICurrency; error: string }>({ value: currencies[0], error: "" });
  const [reference, setReference] = useState({ value: "", error: "" });
  const [payerEmail, setPayerEmail] = useState({ value: "", error: "" });
  const [payerFirstName, setPayerFirstName] = useState({ value: "", error: "" });
  const [payerLastName, setPayerLastName] = useState({ value: "", error: "" });
  const [payerAddress, setPayerAddress] = useState({ value: "", error: "" });
  const [payerDOB, setPayerDOB] = useState({ value: null, error: "" });
  const [payerPOB, setPayerPOB] = useState({ value: "", error: "" });

  const handleClick = () => {
    let temp = 0;
    if (!amount.value) {
      temp++;
      setAmount({ ...amount, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!currency.value) {
      temp++;
      setCurrency({ ...currency, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!reference.value) {
      temp++;
      setReference({ ...reference, error: dictionaryOrder.controlModal.errors.required[locale] });
    }

    if (!isValidEmail(payerEmail.value)) {
      temp++;
      setPayerEmail({ ...payerEmail, error: dictionaryOrder.controlModal.errors.invalidEmail[locale] });
    }
    if (!payerEmail.value) {
      temp++;
      setPayerEmail({ ...payerEmail, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!payerFirstName.value) {
      temp++;
      setPayerFirstName({ ...payerFirstName, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!payerLastName.value) {
      temp++;
      setPayerLastName({ ...payerLastName, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!payerAddress.value) {
      temp++;
      setPayerAddress({ ...payerAddress, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!payerDOB.value) {
      temp++;
      setPayerDOB({ ...payerDOB, error: dictionaryOrder.controlModal.errors.required[locale] });
    }
    if (!payerPOB.value) {
      temp++;
      setPayerPOB({ ...payerPOB, error: dictionaryOrder.controlModal.errors.required[locale] });
    }

    if (temp > 0) return;
    onNext(
      parseFloat(amount.value),
      currency.value.symbol,
      reference.value,
      payerEmail.value,
      payerFirstName.value + " " + payerLastName.value,
      payerAddress.value,
      payerDOB.value,
      payerPOB.value,
      language.value
    );
  };

  useEffect(() => {
    setCurrency({ value: currencies[0], error: "" });
  }, [currencies]);

  useEffect(() => {
    setLanguage({ value: locale, error: "" });
  }, [isOpen]); //eslint-disable-line

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setAmount({ value: "", error: "" });
        setCurrency({ value: currencies[0], error: "" });
        setReference({ value: "", error: "" });
        setPayerEmail({ value: "", error: "" });
        setPayerAddress({ value: "", error: "" });
        setPayerFirstName({ value: "", error: "" });
        setPayerLastName({ value: "", error: "" });
        setPayerDOB({ value: null, error: "" });
        setPayerPOB({ value: "", error: "" });
        setLanguage({ value: locale, error: "" });
      }}
      className="relative z-50 g-box-back w-full max-w-740  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-40 flex flex-col gap-32">
        <div className="flex items-start gap-12">
          <IconBox icon="iconoir:link" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">{dictionaryOrder.controlModal.title[locale]}</h4>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <CurrencyInputSelect
              data={currencies}
              amount={amount.value}
              value={currency.value}
              placeholder="0"
              label={dictionaryOrder.controlModal.labels.amount[locale]}
              error={amount.error || currency.error}
              onAmountChange={(e) => {
                setAmount({ value: e, error: "" });
              }}
              onSelectChange={(selected) => {
                setCurrency({ value: selected, error: "" });
              }}
            ></CurrencyInputSelect>
            <LanguageSelect
              value={language.value}
              onChange={(e) => setLanguage({ error: "", value: e })}
              error={language.error}
              label={dictionaryOrder.controlModal.labels.language[locale]}
            />
          </div>
          <AppInput
            value={reference.value}
            onChange={(e) => {
              setReference({ error: "", value: e });
            }}
            placeholder={dictionaryOrder.controlModal.placeholders.reference[locale]}
            label={dictionaryOrder.controlModal.labels.reference[locale]}
            error={reference.error}
            pattern="^[a-zA-Z0-9-]+$"
          />
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <AppInput
              value={payerFirstName.value}
              onChange={(e) => {
                setPayerFirstName({ error: "", value: e });
              }}
              placeholder={dictionaryOrder.controlModal.placeholders.firstName[locale]}
              label={dictionaryOrder.controlModal.labels.firstName[locale]}
              error={payerFirstName.error}
            />
            <AppInput
              value={payerLastName.value}
              onChange={(e) => {
                setPayerLastName({ error: "", value: e });
              }}
              placeholder={dictionaryOrder.controlModal.placeholders.lastName[locale]}
              label={dictionaryOrder.controlModal.labels.lastName[locale]}
              error={payerLastName.error}
            />
          </div>
          <div className="flex items-start gap-16 md:gap-12 md:flex-row flex-col">
            <div className="w-full flex flex-col gap-8">
              <span className="text-input-label text-14">{dictionaryOrder.controlModal.labels.dob[locale]}</span>
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
              placeholder={dictionaryOrder.controlModal.labels.pob[locale]}
              label={dictionaryOrder.controlModal.placeholders.pob[locale]}
              error={payerPOB.error}
            />
          </div>
          <AppInput
            value={payerEmail.value}
            icon="iconoir:mail"
            onChange={(e) => {
              setPayerEmail({ error: "", value: e });
            }}
            placeholder={dictionaryOrder.controlModal.placeholders.email[locale]}
            label={dictionaryOrder.controlModal.labels.email[locale]}
            error={payerEmail.error}
          />
          <AppInput
            value={payerAddress.value}
            onChange={(e) => {
              setPayerAddress({ error: "", value: e });
            }}
            placeholder={dictionaryOrder.controlModal.placeholders.address[locale]}
            label={dictionaryOrder.controlModal.labels.address[locale]}
            error={payerAddress.error}
          />
          <div className="text-input-label text-14 flex gap-8">
            <Icon icon={"material-symbols:info"} className="text-18 flex-none" />
            <span>
              {dictionaryOrder.controlModal.alert[locale].replace(
                "$1",
                acceptNonStablecoinPayments
                  ? dictionaryOrder.controlModal.allcoin[locale]
                  : dictionaryOrder.controlModal.stableonly[locale]
              )}{" "}
              <Link href={"/app/account"} className="text-[#7fa0b4] underline hover:text-info">
                {dictionaryOrder.controlModal.here[locale]}
              </Link>
              .
            </span>
          </div>
          <button
            onClick={handleClick}
            className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          >
            {dictionaryOrder.controlModal.buttons.generate[locale]}
            <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ControlModal;
