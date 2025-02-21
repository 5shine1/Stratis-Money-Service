import 'core-js/actual';
import React, { useState } from "react";
import Modal from "react-modal";
import { listen } from "@ledgerhq/logs";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { DeviceManagementKit } from '@ledgerhq/device-management-kit';
import { SignerEthBuilder } from '@ledgerhq/device-signer-kit-ethereum'
import { observableBehavior } from '@/utils/web3.utils';
import { ethers } from "ethers";

import { Icon } from "@iconify/react";
import IconBox from "@/components/global/IconBox";
import { DefaultSignerEth } from '@ledgerhq/device-signer-kit-ethereum/internal/DefaultSignerEth.js';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ConnectModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isConnected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [signerEth, setSignerEth] = useState<DefaultSignerEth>();

  const handleSign = async () => {
    const tx = {
      to: "RECIPIENT_ADDRESS", // Replace with the recipient's address
      value: ethers.parseEther("0.1"), // Amount of Ether to send (e.g., 0.1 ETH)
      gasLimit: ethers.hexlify("21000"), // Set gas limit (typically 21000 for standard transactions)
      gasPrice: ethers.parseUnits("50", "gwei") // Set gas price (e.g., 50 Gwei)
    }

    const unsignedTx = new TextEncoder().encode(ethers.Transaction.from(tx).unsignedSerialized.substring(2));

    const { observable, cancel } = signerEth.signTransaction(
      "44'/60'/0'/0/0", unsignedTx
    );
  }

  const handleConnect = async () => {
    try {
      const transport = await TransportWebUSB.create();

      // Listen to the events which are sent by the Ledger packages in order to debug the app
      listen((log: any) => console.log(log));

      const dmk = new DeviceManagementKit();
      const sessionId = "cd12538-b02a-4282-99de-4d90f10769a0";  // Example Session Id
      const signerEth = new SignerEthBuilder({ dmk, sessionId }).build();

      const { observable, cancel } = signerEth.getAddress("44'/60'/0'/0/0");
      const output = observableBehavior(observable)

      setSignerEth(signerEth)
      setAddress(output.address)
      setConnected(true);
    
    } catch (e) {
      window.alert(String(e.message || e))
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative z-50 g-box-back w-full max-w-740  rounded-20 shadow-md m-auto border border-modal-border"
      overlayClassName="bg-black/50 backdrop-blur-md fixed left-0 top-0 w-full h-full z-40 px-8 py-32 overflow-y-auto flex items-start justify-center"
    >
      <Icon
        icon="clarity:close-line"
        className="w-32 h-32 text-white/50 hover:text-white/80 u-transition-color cursor-pointer absolute right-20 top-20"
        onClick={onClose}
      />
      <div className="p-12 py-24 md:p-40 flex flex-col gap-32">
        <div className="flex items-start gap-12">
          <IconBox icon="material-symbols-light:assistant-device-outline" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">Approve</h4>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          {isConnected? (
            <>
              <div className='text-xl flex items-center'>
                <Icon icon="icon-park-outline:check-one" className="w-28 h-28 text-success mr-20" />
                <span>Connected</span>
              </div>
              <p className="text-xl">
                Address: {address}
              </p>
              <button
                onClick={handleSign}
                className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
              >
                Sign
                <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16" />
              </button>
            </>
          ) : (
            <>
              <div className='text-xl flex items-center'>
                <Icon icon="icon-park-outline:close-one" className="w-28 h-28 text-error mr-20" />
                <span>Disconnected</span>
              </div>
              <p className="text-xl">
                Connect your Ledger device to approve the withdraw.
              </p>
              <button
                onClick={handleConnect}
                className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
              >
                Connect
                <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16" />
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConnectModal;
