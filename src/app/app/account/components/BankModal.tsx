import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import AppInput from "@/components/global/AppInput";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import { isValidBankIBAN, isValidBIC } from "@/utils/string.utils";
import { dictionaryProfile } from "@/config/dictionary";
import useAppSelector from "@/hooks/global/useAppSelector";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: (bankAccountHolder: string, bankIban: string, bankBic: string) => void; //eslint-disable-line
};
const BankModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [bankAccountHolder, setBankAccountHolder] = useState({ value: "", error: "" });
  const [bankIban, setBankIban] = useState({ value: "", error: "" });
  const [bankBic, setBankBic] = useState({ value: "", error: "" });

  const handleClick = () => {
    let temp = 0;
    if (!bankAccountHolder.value) {
      temp++;
      setBankAccountHolder({ ...bankAccountHolder, error: dictionaryProfile.bankModal.errors.fieldRequired[locale] });
    }
    if (!isValidBankIBAN(bankIban.value)) {
      temp++;
      setBankIban({ ...bankIban, error: dictionaryProfile.bankModal.errors.invalidIBAN[locale] });
    }
    if (!bankIban.value) {
      temp++;
      setBankIban({ ...bankIban, error: dictionaryProfile.bankModal.errors.fieldRequired[locale] });
    }
    if (!isValidBIC(bankBic.value)) {
      temp++;
      setBankBic({ ...bankBic, error: dictionaryProfile.bankModal.errors.invalidBIC[locale] });
    }
    if (!bankBic.value) {
      temp++;
      setBankBic({ ...bankBic, error: dictionaryProfile.bankModal.errors.fieldRequired[locale] });
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
      className="relative z-50 bg-primary-800 w-full max-w-480  rounded-12 shadow-md m-auto"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 flex flex-col gap-16 md:gap-32 bg-transparent">
        <h4 className="g-button-text w-fit pr-30">{dictionaryProfile.bankModal.title[locale]}</h4>
        <div className="flex flex-col gap-16 md:gap-24">
          <AppInput
            value={bankAccountHolder.value}
            onChange={(e) => {
              setBankAccountHolder({ error: "", value: e });
            }}
            placeholder={dictionaryProfile.bankModal.labels.bankAccount[locale]}
            label={dictionaryProfile.bankModal.labels.bankAccount[locale]}
            error={bankAccountHolder.error}
          />
          <AppInput
            value={bankIban.value}
            onChange={(e) => {
              setBankIban({ error: "", value: e });
            }}
            placeholder={dictionaryProfile.bankModal.labels.bankIBAN[locale]}
            label={dictionaryProfile.bankModal.labels.bankIBAN[locale]}
            error={bankIban.error}
          />
          <AppInput
            value={bankBic.value}
            onChange={(e) => {
              setBankBic({ error: "", value: e });
            }}
            placeholder={dictionaryProfile.bankModal.labels.bankBIC[locale]}
            label={dictionaryProfile.bankModal.labels.bankBIC[locale]}
            error={bankBic.error}
          />

          <AnimatedSlideButton
            onClick={handleClick}
            className="text-white text-20 py-12 px-32 border border-secondary-300  rounded-full mt-8"
            backClassName="from-primary-400 to-secondary-300 "
          >
            {dictionaryProfile.bankModal.buttons.save[locale]}
          </AnimatedSlideButton>
        </div>
      </div>
    </Modal>
  );
};

export default BankModal;
