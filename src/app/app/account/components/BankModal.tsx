import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: (bankAccountHolder: string, bankIban: string, bankBic: string) => void; //eslint-disable-line
};
const BankModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  const [bankAccountHolder, setBankAccountHolder] = useState({ value: "", error: "" });
  const [bankIban, setBankIban] = useState({ value: "", error: "" });
  const [bankBic, setBankBic] = useState({ value: "", error: "" });

  const handleClick = () => {
    let temp = 0;
    if (!bankAccountHolder.value) {
      temp++;
      setBankAccountHolder({ ...bankAccountHolder, error: "This field required." });
    }
    if (!bankIban.value) {
      temp++;
      setBankIban({ ...bankIban, error: "This field required." });
    }
    if (!bankBic.value) {
      temp++;
      setBankBic({ ...bankBic, error: "This field required." });
    }

    if (temp > 0) return;
    onNext(bankAccountHolder.value, bankIban.value, bankBic.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setBankAccountHolder({ value: "", error: "" });
        setBankIban({ value: "", error: "" });
        setBankBic({ value: "", error: "" });
      }}
      className="relative z-50 bg-white dark:bg-primary-800 w-full max-w-480  rounded-12 shadow-md m-auto"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 flex flex-col gap-16 md:gap-32 bg-secondary-100/20 dark:bg-transparent">
        <h4 className="g-button-text w-fit pr-30">Input your Bank Details</h4>
        <div className="flex flex-col gap-16 md:gap-24">
          <AppInput
            value={bankAccountHolder.value}
            onChange={(e) => {
              setBankAccountHolder({ error: "", value: e });
            }}
            placeholder="Bank Account"
            label="Bank Account"
            error={bankAccountHolder.error}
          />
          <AppInput
            value={bankIban.value}
            onChange={(e) => {
              setBankIban({ error: "", value: e });
            }}
            placeholder="Bank IBAN"
            label="Bank IBAN"
            error={bankIban.error}
          />
          <AppInput
            value={bankBic.value}
            onChange={(e) => {
              setBankBic({ error: "", value: e });
            }}
            placeholder="Bank BIC"
            label="Bank BIC"
            error={bankBic.error}
          />

          <AnimatedSlideButton
            onClick={handleClick}
            className="text-primary-200 dark:text-white text-20 py-12 px-32 border border-primary-200 dark:border-secondary-300  rounded-full mt-8"
            backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
          >
            Save
          </AnimatedSlideButton>
        </div>
      </div>
    </Modal>
  );
};

export default BankModal;
