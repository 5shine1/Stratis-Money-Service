import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";

import CustomSelect from "@/components/global/CustomSelect";
import { IWithdrawHistory } from "@/@types/data";
import IconBox from "@/components/global/IconBox";

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
      className="relative z-50 g-box-back w-full max-w-440  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
     <div className="p-12 py-24 md:p-40 flex flex-col gap-32">
        <div className="flex items-start gap-12">
          <IconBox icon="ph:hand-withdraw-thin" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">Withdraw Status</h4>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          <CustomSelect
            data={sortData}
            init={sortData[currentSort]}
            onChange={(selected) => {
              setCurrentSort(selected.id);
            }}
            mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
            padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
            listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
          />

          <button
            onClick={() => {
              onNext(isOpen.withdrawalId, currentSort);
            }}
            className="w-full max-w-440 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          >
            Save
            <Icon icon={"octicon:arrow-right-16"} className="w-16 h-16" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StatusChangeModal;
