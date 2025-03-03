import React, { useContext, useState } from "react";
import Modal from "react-modal";

import AppInput from "@/components/global/AppInput";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isValidEmail } from "@/utils/string.utils";
import toast from "react-hot-toast";
import { apiInviteAgent } from "@/api/auth.api";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { dictionaryAgent } from "@/config/dictionary";
import IconBox from "@/components/global/IconBox";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const InviteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [email, setEmail] = useState({ value: "", error: "" });
  const { userId } = useAppSelector((state) => state.auth);
  const { setLoading } = useContext(LoadingContext);

  const handleInviteAgent = async () => {
    if (!email.value) {
      setEmail({ ...email, error: dictionaryAgent.inviteModal.errors.emailRequired[locale] });
      return;
    }
    if (!isValidEmail(email.value)) {
      setEmail({ ...email, error: dictionaryAgent.inviteModal.errors.invalidEmail[locale] });
      return;
    }
    setLoading(true);
    try {
      await apiInviteAgent(email.value, userId);
      toast.success(dictionaryAgent.inviteModal.messages.invitationSent[locale]);
      onClose();
    } catch (error) {
      toast.error(dictionaryAgent.inviteModal.errors.somethingWrong[locale]);
    }
    setLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => setEmail({ value: "", error: "" })}
      className="relative z-50 g-box-back w-full max-w-500  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-40 flex flex-col gap-32">
        <div className="flex items-start gap-12">
          <IconBox icon="material-symbols-light:real-estate-agent-outline" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">{dictionaryAgent.inviteModal.title[locale]}</h4>
        </div>
        <div className="flex flex-col gap-16">
          <AppInput
            value={email.value}
            onChange={(e) => {
              setEmail({ error: "", value: e });
            }}
            placeholder={dictionaryAgent.inviteModal.placeholders.agentEmail[locale]}
            label={dictionaryAgent.inviteModal.labels.agentEmail[locale]}
            error={email.error}
          />
          <button
          onClick={handleInviteAgent}
          className="w-full max-w-500 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          >
            {dictionaryAgent.inviteModal.buttons.sendInvite[locale]}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
