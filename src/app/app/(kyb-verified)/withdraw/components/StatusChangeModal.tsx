import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import CustomSelect from "@/components/global/CustomSelect";
import { IWithdrawHistory } from "@/@types/data";

type Props = {
  isOpen: null | IWithdrawHistory;
  onClose: () => void;
  onNext: (id: string, status: number) => void; //eslint-disable-line
};
const StatusChangeModal: React.FC<Props> = ({ isOpen, onClose, onNext }) => {
  const sortData = [
    { id: 0, key: "Pending", text: "Pending" },
    { id: 1, key: "Completed", text: "Completed" },
    { id: 2, key: "Cancelled", text: "Cancelled" },
  ];

  const [currentSort, setCurrentSort] = useState(0);

  useEffect(() => {
    setCurrentSort(isOpen?.status || 0);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen !== null}
      onRequestClose={onClose}
      className="relative z-50 p-24 bg-white dark:bg-primary-800 w-full max-w-440 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 text-primary-200 dark:text-white/50 dark:hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="flex flex-col gap-32">
        <h4 className="g-button-text w-fit pr-30">Withdraw Status</h4>
        <div className="flex flex-col gap-16">
          <CustomSelect
            data={sortData}
            init={sortData[currentSort]}
            onChange={(selected) => {
              setCurrentSort(selected.id);
            }}
            mainClass="text-primary-500 dark:text-white border border-secondary-400 dark:border-primary-500 rounded-6 py-12 px-16 cursor-pointer u-text-overflow"
            padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-secondary-100 dark:bg-primary-900 text-primary-500/80 dark:text-white/70 flex flex-col gap-4 overflow-y-auto  z-10 p-8"
            listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
          />

          <AnimatedSlideButton
            onClick={() => {
              onNext(isOpen.withdrawalId, currentSort);
            }}
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

export default StatusChangeModal;
