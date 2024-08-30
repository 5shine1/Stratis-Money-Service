import { ICurrency } from "@/@types/common";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppCurrencySelect from "@/components/global/AppCurrencySelect";
import AppInput from "@/components/global/AppInput";
import useAppSelector from "@/hooks/global/useAppSelector";
import React, { useState } from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const RequestWithdrawModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState({ value: "", error: "" });
  const { currencies } = useAppSelector((state) => state.payment);
  const [currency, setCurrency] = useState<{ value: ICurrency | null; error: string }>({ value: null, error: "" });
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative z-50 overflow-hidden bg-white dark:bg-primary-800 w-full max-w-400 p-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
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
      <AnimatedSlideButton
        onClick={() => {}}
        className="text-primary-200 dark:text-white text-20 py-12 px-32 border border-primary-200 dark:border-secondary-300  rounded-full mt-8"
        backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
      >
        Request Withdraw
      </AnimatedSlideButton>
    </Modal>
  );
};

export default RequestWithdrawModal;
