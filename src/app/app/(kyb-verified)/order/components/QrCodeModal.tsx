import React from "react";
import Modal from "react-modal";
import QRCode from "react-qr-code";

type Props = {
  data: null | string;
  onClose: () => void;
};
const QrCodeModal: React.FC<Props> = ({ data, onClose }) => {
  return (
    <Modal
      isOpen={data !== null}
      onRequestClose={onClose}
      className="relative z-50 overflow-hidden bg-white dark:bg-primary-800 w-full max-w-320 p-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-12 shadow-md"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32"
    >
      <div className="border-4 border-secondary-200">
        <QRCode
          value={`ethereum:<recipient_address>?contract=<erc20_contract_address>&value=<amount>&chain=<network_name>&symbol=<token_symbol>`}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
    </Modal>
  );
};

export default QrCodeModal;
