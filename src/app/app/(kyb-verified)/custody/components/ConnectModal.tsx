import 'core-js/actual';
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { listen } from "@ledgerhq/logs";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import type Transport from "@ledgerhq/hw-transport";
import Eth from "@ledgerhq/hw-app-eth";
import { Icon } from "@iconify/react";
import IconBox from "@/components/global/IconBox";
import CustomInput from "@/components/global/CustomInput";
import axiosInstance from "@/config/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  withdrawalData?: {
    amount: string;
    nonce: number;
    chainId: number;
  };
};

enum ApprovalState {
  DISCONNECTED,
  CONNECTED,
  SIGNING,
  SIGNED,
  ERROR
}

const ConnectModal: React.FC<Props> = ({ isOpen, onClose, withdrawalData }) => {
  const [approvalState, setApprovalState] = useState<ApprovalState>(ApprovalState.DISCONNECTED);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>("");
  const [transport, setTransport] = useState<Transport | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientError, setRecipientError] = useState("");

  const validateRecipientAddress = (address: string) => {
    try {
      if (!address) {
        setRecipientError("Recipient address is required");
        return false;
      }
      if (!ethers.isAddress(address)) {
        setRecipientError("Invalid Ethereum address");
        return false;
      }
      setRecipientError("");
      return true;
    } catch (e) {
      setRecipientError("Invalid Ethereum address");
      return false;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setApprovalState(ApprovalState.DISCONNECTED);
      setError("");
      if (transport) {
        transport.close();
      }
      setTransport(null);
    }
  }, [isOpen, transport]);

  const handleConnect = async () => {
    try {
      setError("");
      toast.loading("Connecting to Ledger device...", { id: "ledger-connect" });

      // Create WebUSB transport
      const newTransport = await TransportWebUSB.create();
      setTransport(newTransport);

      listen((log) => console.debug("Ledger log:", log));

      // Create Ethereum app instance
      const eth = new Eth(newTransport);

      // Get Ethereum address
      try {
        const { address: deviceAddress } = await eth.getAddress("44'/60'/0'/0/0", false);
        setAddress(deviceAddress);
        setApprovalState(ApprovalState.CONNECTED);
        toast.success("Connected to Ledger device!", { id: "ledger-connect" });
      } catch (err) {
        console.error("Failed to get address:", err);
        setError("Failed to get address from Ledger device. Please make sure the Ethereum app is open.");
        setApprovalState(ApprovalState.ERROR);
        toast.error("Failed to connect to Ledger", { id: "ledger-connect" });
        
        if (newTransport) {
          newTransport.close();
        }
        setTransport(null);
      }
    } catch (e) {
      console.error("Connection error:", e);
      setError(e.message || "Failed to connect to Ledger device");
      setApprovalState(ApprovalState.ERROR);
      toast.error("Failed to connect to Ledger", { id: "ledger-connect" });
      
      if (transport) {
        transport.close();
      }
      setTransport(null);
    }
  };

  const handleSign = async () => {
    if (!validateRecipientAddress(recipientAddress)) {
      return;
    }

    if (!withdrawalData || !transport) {
      setError("No withdrawal data or transport available");
      setApprovalState(ApprovalState.ERROR);
      toast.error("Missing withdrawal data or device connection");
      return;
    }

    try {
      setApprovalState(ApprovalState.SIGNING);
      setError("");

      const eth = new Eth(transport);

      // Create transaction with user-provided recipient address
      const tx = {
        to: recipientAddress, // Using user input recipient address
        value: ethers.parseEther(withdrawalData.amount),
        nonce: withdrawalData.nonce,
        gasLimit: ethers.toBigInt(21000),
        gasPrice: ethers.parseUnits("50", "gwei"),
        chainId: withdrawalData.chainId
      };

      const transaction = ethers.Transaction.from(tx);
      const unsignedTx = transaction.unsignedSerialized.substring(2);

      try {
        const signature = await eth.signTransaction("44'/60'/0'/0/0", unsignedTx);
        
        // Send both signature and user-provided recipient to API
        const signedTxData = {
          r: signature.r,
          s: signature.s,
          v: signature.v,
          recipient: recipientAddress, // Using user input recipient address
          amount: withdrawalData.amount,
          nonce: withdrawalData.nonce,
          chainId: withdrawalData.chainId
        };

        // Call the API with signed transaction data
        const response = await axiosInstance.post("/api/Payment/SignTx", signedTxData);
        if (response.data?.isSucceed) {
          setApprovalState(ApprovalState.SIGNED);
          toast.success("Transaction signed and submitted successfully!", { id: "ledger-sign" });
        } else {
          throw new Error(response.data?.message || "Failed to submit transaction");
        }
      } catch (err) {
        console.error("Signing/submission error:", err);
        setError("Failed to sign or submit transaction. Please try again.");
        setApprovalState(ApprovalState.ERROR);
        toast.error("Failed to sign or submit transaction", { id: "ledger-sign" });
      }
    } catch (e) {
      console.error("Signing error:", e);
      setError(e.message || "Failed to sign transaction");
      setApprovalState(ApprovalState.ERROR);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative z-50 g-box-back w-full max-w-740 rounded-20 shadow-md m-auto border border-modal-border"
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
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">Approve Withdrawal</h4>
        </div>
        
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Status Display */}
          <div className="flex items-center gap-4">
            <Icon 
              icon={approvalState >= ApprovalState.CONNECTED ? "icon-park-outline:check-one" : "icon-park-outline:close-one"} 
              className={`w-28 h-28 ${approvalState >= ApprovalState.CONNECTED ? "text-success" : "text-error"} mr-20`} 
            />
            <span className="text-xl">
              {approvalState >= ApprovalState.CONNECTED ? "Connected" : "Disconnected"}
            </span>
          </div>

          {/* Address Display */}
          {address && (
            <p className="text-xl">
              Address: {address}
            </p>
          )}

          {/* Recipient Address Input */}
          {approvalState >= ApprovalState.CONNECTED && (
            <div className="w-full">
              <CustomInput
                value={recipientAddress}
                onChange={(value) => {
                  setRecipientAddress(value);
                  validateRecipientAddress(value);
                }}
                placeholder="Enter recipient ETH address"
                error={recipientError}
              />
            </div>
          )}

          {/* Withdrawal Details */}
          {withdrawalData && approvalState >= ApprovalState.CONNECTED && (
            <div className="bg-primary-900/50 p-16 rounded-8 mt-8">
              <h5 className="text-16 font-semibold mb-12">Withdrawal Details</h5>
              <div className="flex flex-col gap-8">
                <p>Amount: {withdrawalData.amount} ETH</p>
                <p>Nonce: {withdrawalData.nonce}</p>
              </div>
            </div>
          )}

          {/* Show message when no withdrawal data is available */}
          {!withdrawalData && approvalState >= ApprovalState.CONNECTED && (
            <div className="bg-warning/10 p-16 rounded-8 mt-8">
              <p className="text-warning text-14">No withdrawal data available. Please try again.</p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="text-error text-14 mt-8">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          {approvalState === ApprovalState.DISCONNECTED && (
            <button
              onClick={handleConnect}
              className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
            >
              Connect Ledger
              <Icon icon="material-symbols:usb" className="w-20 h-20 ml-8" />
            </button>
          )}

          {approvalState === ApprovalState.CONNECTED && (
            <button
              onClick={handleSign}
              disabled={!recipientAddress || !!recipientError}
              className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Transaction
              <Icon icon="material-symbols:approval-outline" className="w-20 h-20 ml-8" />
            </button>
          )}

          {approvalState === ApprovalState.SIGNED && (
            <div className="flex flex-col gap-12 items-center">
              <Icon icon="material-symbols:check-circle-outline" className="w-48 h-48 text-success" />
              <p className="text-success text-16">Transaction signed successfully!</p>
              <button
                onClick={onClose}
                className="mt-8 text-button-text text-16 py-12 px-24 rounded-8 border border-button-border hover:bg-button-border/10"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConnectModal;
