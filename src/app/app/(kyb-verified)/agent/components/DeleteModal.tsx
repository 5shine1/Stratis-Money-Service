import React from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryAgent } from "@/config/dictionary";

type Props = {
  isOpen: null | string;
  onClose: () => void;
  onNext: () => void;
};
const DeleteModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  const { locale } = useAppSelector((state) => state.locale);
  return (
    <Modal
      isOpen={isOpen !== null}
      onRequestClose={onClose}
      className="relative z-50 g-box-back w-full max-w-350  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-40 flex flex-col gap-32 items-center">
        <Icon icon="line-md:question-circle" className="w-80 h-80 text-info"></Icon>
        <p className="bold text-center text-white">{dictionaryAgent.deleteModal.message[locale]}</p>

        <button
        onClick={onNext}
        className="w-full max-w-350 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
        >
          {dictionaryAgent.deleteModal.buttons.remove[locale]}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
