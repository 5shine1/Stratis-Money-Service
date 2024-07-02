import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

import AppInput from "@/components/global/AppInput";
import AppTextArea from "@/components/global/AppTextArea";
import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  data: any;
};
const ControlModal: React.FC<Props> = ({ isOpen, onClose, onNext, data }) => {
  const [amount, setAmount] = useState({ value: "", error: "" });
  const [description, setDescription] = useState({ value: "", error: "" });
  const [payer, setPayer] = useState({ value: "", error: "" });

  const handleClick = () => {
    let temp = 0;
    if (!amount.value) {
      temp++;
      setAmount({ ...amount, error: "Amount required." });
    }
    if (!description.value) {
      temp++;
      setDescription({ ...description, error: "Amount required." });
    }
    if (temp > 0) return;
    onNext();
  };

  useEffect(() => {
    if (data) {
      setAmount({ value: data.amount || "", error: "" });
      setDescription({ value: data.description || "", error: "" });
      setPayer({ value: data.payer || "", error: "" });
    }
  }, [data]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setAmount({ value: "", error: "" });
        setDescription({ value: "", error: "" });
        setPayer({ value: "", error: "" });
      }}
      className="relative z-50  overflow-hidden bg-white dark:bg-primary-800 w-full max-w-640  rounded-12 shadow-md m-auto"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 flex flex-col gap-16 md:gap-32 bg-secondary-100/20 dark:bg-transparent">
        <h4 className="g-button-text w-fit pr-30">{data ? "Edit Detail" : "Generate New Link"}</h4>
        <div className="flex flex-col gap-12 md:gap-24">
          <AppInput
            value={amount.value}
            onChange={(e) => {
              setAmount({ error: "", value: e });
            }}
            placeholder="0.0"
            label="Amount"
            error={amount.error}
          />
          <AppInput
            value={amount.value}
            onChange={(e) => {
              setAmount({ error: "", value: e });
            }}
            placeholder="0.0"
            label="Currency"
            error={amount.error}
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
          <AppInput
            value={payer.value}
            onChange={(e) => {
              setPayer({ error: "", value: e });
            }}
            placeholder="Email address"
            label="Email"
            error={payer.error}
          />
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
