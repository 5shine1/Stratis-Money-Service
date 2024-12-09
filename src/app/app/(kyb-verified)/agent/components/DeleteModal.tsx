import React from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
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
      className="relative z-50 overflow-hidden bg-primary-800 w-full max-w-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 bg-transparent  flex flex-col gap-24  items-center">
        <Icon icon="line-md:question-circle" className="w-80 h-80 text-info"></Icon>
        <p className="bold text-center text-white">{dictionaryAgent.deleteModal.message[locale]}</p>
        <AnimatedSlideButton
          onClick={onNext}
          className="text-white text-16 py-12 px-48 border border-secondary-300 rounded-full"
          backClassName="from-primary-400 to-secondary-300 "
        >
          {dictionaryAgent.deleteModal.buttons.remove[locale]}
        </AnimatedSlideButton>
      </div>
    </Modal>
  );
};

export default DeleteModal;
