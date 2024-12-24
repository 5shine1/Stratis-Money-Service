import React, { useContext, useState } from "react";
import Modal from "react-modal";

import AnimatedSlideButton from "@/components/global/AnimatedSlideButton";
import AppInput from "@/components/global/AppInput";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isValidEmail } from "@/utils/string.utils";
import toast from "react-hot-toast";
import { apiInviteAgent } from "@/api/auth.api";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { dictionaryAgent } from "@/config/dictionary";

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
      className="relative z-50 overflow-hidden bg-primary-800 w-full max-w-400 p-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <Icon
        icon="zondicons:close-outline"
        className="w-32 h-32 hover:text-white/80 hover:text-primary-500 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="flex flex-col gap-32">
        <h4 className="g-button-text w-fit pr-30">{dictionaryAgent.inviteModal.title[locale]}</h4>
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

          <AnimatedSlideButton
            onClick={() => {
              handleInviteAgent();
            }}
            className="text-white text-20 py-12 px-32 border border-secondary-300  rounded-full mt-8"
            backClassName="from-primary-400 to-secondary-300 "
          >
            {dictionaryAgent.inviteModal.buttons.sendInvite[locale]}
          </AnimatedSlideButton>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;
