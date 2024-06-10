import React from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
};
const DeleteModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative z-50 overflow-hidden bg-white dark:bg-primary-800 w-full max-w-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-32 bg-secondary-100/20 dark:bg-transparent  flex flex-col gap-24  items-center">
        <Icon icon="line-md:question-circle" className="w-80 h-80 text-info"></Icon>
        <p className="bold text-center text-primary-600 dark:text-white">Are you sure you want to delete this item?</p>
        <AnimatedSlideButton
          onClick={onNext}
          className="text-primary-200 dark:text-white text-16 py-12 px-48 border border-primary-200 dark:border-secondary-300 rounded-full"
          backClassName="from-primary-100 to-secondary-100 dark:from-primary-400 dark:to-secondary-300 "
        >
          Delete
        </AnimatedSlideButton>
      </div>
    </Modal>
  );
};

export default DeleteModal;
