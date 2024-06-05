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
      className="relative z-50 bg-primary-800 w-full max-w-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md p-32 flex flex-col gap-24  items-center"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40"
    >
      <Icon
        icon="zondicons:close-solid"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <Icon icon="line-md:question-circle" className="w-80 h-80 text-info"></Icon>
      <p className="bold">Are you sure you want to delete this item?</p>
      <AnimatedSlideButton onClick={onNext} className=" text-16 py-12 px-48 border border-secondary-300 rounded-full">
        Delete
      </AnimatedSlideButton>
    </Modal>
  );
};

export default DeleteModal;
