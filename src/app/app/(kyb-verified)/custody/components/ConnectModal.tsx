/* eslint-disable */
import 'core-js/actual';
import React, { useState, useEffect, useCallback } from "react";
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

const ETHEREUM_DERIVATION_PATH = "44'/60'/0'/0/0";

const LEDGER_STATUS_CODES = {
  LOCKED: 0x6804,
  APP_NOT_OPEN: 0x6700,
  APP_NOT_OPEN_ALT: 0x6982,
  USER_REJECTED: 0x6985
} as const;

// Add WebUSB types
declare global {
  interface Navigator {
    usb?: {
      addEventListener(type: string, listener: (event: { device: USBDevice }) => void): void;
      removeEventListener(type: string, listener: (event: { device: USBDevice }) => void): void;
    };
  }
  interface USBDevice {
    productName: string;
    manufacturerName: string;
    serialNumber: string;
  }
}

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

enum DeviceState {
  DISCONNECTED,
  LOCKED,
  NO_APP,
  READY
}

const ConnectModal: React.FC<Props> = ({ isOpen, onClose, withdrawalData }) => {
  const [approvalState, setApprovalState] = useState<ApprovalState>(ApprovalState.DISCONNECTED);
  const [deviceState, setDeviceState] = useState<DeviceState>(DeviceState.DISCONNECTED);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>("");
  const [transport, setTransport] = useState<Transport | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);
  const [lastSignature, setLastSignature] = useState<{
    r: string;
    s: string;
    v: number;
    recipient: string;
    amount: string;
    nonce: number;
    chainId: number;
  } | null>(null);

  const handleDisconnect = useCallback(() => {
    console.log("Device disconnected");
    setDeviceState(DeviceState.DISCONNECTED);
    setApprovalState(ApprovalState.DISCONNECTED);
    setError("Device disconnected. Please reconnect your Ledger.");
    setAddress("");
    if (transport) {
      transport.close();
    }
    setTransport(null);
  }, [transport]);

  // Set up USB disconnect listener
  useEffect(() => {
    if (!isOpen) return;

    const handleUSBDisconnect = (event: { device: USBDevice }) => {
      console.log("USB device disconnected:", event.device);
      handleDisconnect();
    };

    navigator.usb?.addEventListener('disconnect', handleUSBDisconnect);
    
    return () => {
      navigator.usb?.removeEventListener('disconnect', handleUSBDisconnect);
    };
  }, [isOpen, handleDisconnect]);

  const checkDeviceState = async () => {
    if (!transport) {
      // If no transport but we're in NO_APP state, try to reconnect
      if (deviceState === DeviceState.NO_APP) {
        try {
          const newTransport = await TransportWebUSB.create();
          setTransport(newTransport);
          listen((log) => console.debug("Ledger log:", log));
        } catch (e) {
          console.log("Failed to recreate transport:", e);
          setDeviceState(DeviceState.DISCONNECTED);
          return;
        }
      } else {
        setDeviceState(DeviceState.DISCONNECTED);
        return;
      }
    }

    try {
      const eth = new Eth(transport || await TransportWebUSB.create());
      
      // Try to get the app info - this will fail if device is locked or app is not open
      try {
        await eth.getAppConfiguration();
        
        // If we were previously in NO_APP state, we need to re-get the address
        if (deviceState === DeviceState.NO_APP) {
          try {
            const { address: deviceAddress } = await eth.getAddress(ETHEREUM_DERIVATION_PATH, false);
            setAddress(deviceAddress);
            setApprovalState(ApprovalState.CONNECTED);
            toast.success("Reconnected to Ethereum app!", { id: "ledger-connect" });
          } catch (err) {
            console.error("Failed to get address after reconnect:", err);
          }
        }
        
        setDeviceState(DeviceState.READY);
        setError("");
      } catch (err: any) {
        console.log("Device state check error:", err);
        
        // Check for specific error conditions
        if (err.statusText === "UNKNOWN_ERROR" || err.name === "DisconnectedDeviceDuringOperation") {
          handleDisconnect();
        }
        // Device is locked
        else if (err.statusCode === LEDGER_STATUS_CODES.LOCKED) {
          setDeviceState(DeviceState.LOCKED);
          setError("Ledger device is locked. Please unlock it.");
        }
        // App is not open
        else if (err.statusCode === LEDGER_STATUS_CODES.APP_NOT_OPEN || err.statusCode === LEDGER_STATUS_CODES.APP_NOT_OPEN_ALT) {
          setDeviceState(DeviceState.NO_APP);
          setError("Please open the Ethereum app on your Ledger device.");
        }
        // Generic app error
        else {
          setDeviceState(DeviceState.NO_APP);
          setError("Please make sure the Ethereum app is open on your Ledger device.");
        }
      }
    } catch (e: any) {
      console.log("Transport error:", e);
      // Only handle actual disconnection errors
      if (e.name === "DisconnectedDevice" || e.name === "DisconnectedDeviceDuringOperation" || e.message?.includes("cannot open device")) {
        handleDisconnect();
      }
    }
  };

  // Check device state periodically
  useEffect(() => {
    if (!isOpen || !transport || isWaitingForSignature) return;

    // Initial check
    checkDeviceState();

    const interval = setInterval(checkDeviceState, 1000);
    return () => clearInterval(interval);
  }, [isOpen, transport, isWaitingForSignature]);

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
      setDeviceState(DeviceState.DISCONNECTED);
      setError("");
      setRecipientAddress("");
      setRecipientError("");
      setLastSignature(null);
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

      // Initial device state check
      await checkDeviceState();

      // Get Ethereum address
      try {
        const eth = new Eth(newTransport);
        const { address: deviceAddress } = await eth.getAddress(ETHEREUM_DERIVATION_PATH, false);
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

  const submitSignedTransaction = async (signedTxData: typeof lastSignature) => {
    try {
      const response = await axiosInstance.post("/api/Payment/SignTx", signedTxData);
      if (response.data?.isSucceed) {
        setApprovalState(ApprovalState.SIGNED);
        toast.success("Transaction signed and submitted successfully!", { id: "ledger-sign" });
        setLastSignature(null); // Clear signature after successful submission
      } else {
        throw new Error(response.data?.message || "Failed to submit transaction");
      }
    } catch (error) {
      console.error("API submission error:", error);
      toast.error("Failed to submit transaction. You can try submitting again.", { id: "ledger-sign" });
      setApprovalState(ApprovalState.CONNECTED);
      setError("Transaction was signed but submission failed. You can try submitting again.");
    }
  };

  const handleRetrySubmit = async () => {
    if (!lastSignature) {
      setError("No signed transaction available to retry");
      return;
    }
    
    setApprovalState(ApprovalState.SIGNING);
    setError("");
    await submitSignedTransaction(lastSignature);
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
      // Check device state before attempting to sign
      await checkDeviceState();
      
      if (deviceState !== DeviceState.READY) {
        setError("Please make sure your Ledger is unlocked and the Ethereum app is open");
        return;
      }

      setApprovalState(ApprovalState.SIGNING);
      setError("");
      setIsWaitingForSignature(true); // Pause device state checks

      const eth = new Eth(transport);

      // Create transaction with user-provided recipient address
      const tx = {
        to: recipientAddress,
        value: ethers.parseEther(withdrawalData.amount),
        nonce: withdrawalData.nonce,
        gasLimit: ethers.toBigInt(21000),
        gasPrice: ethers.parseUnits("50", "gwei"),
        chainId: withdrawalData.chainId
      };

      const transaction = ethers.Transaction.from(tx);
      const unsignedTx = transaction.unsignedSerialized.substring(2);

      try {
        toast.loading("Please confirm the transaction on your Ledger device...", { id: "ledger-sign" });
        const signature = await eth.signTransaction(ETHEREUM_DERIVATION_PATH, unsignedTx);
        
        // Store signature and transaction data
        const signedTxData = {
          r: signature.r,
          s: signature.s,
          v: parseInt(signature.v, 16),
          recipient: recipientAddress,
          amount: withdrawalData.amount,
          nonce: withdrawalData.nonce,
          chainId: withdrawalData.chainId
        };
        
        setLastSignature(signedTxData);
        await submitSignedTransaction(signedTxData);
      } catch (err: any) {
        console.error("Signing/submission error:", err);
        
        // Handle specific Ledger errors
        if (err.statusCode === LEDGER_STATUS_CODES.LOCKED) {
          setError("Ledger device is locked. Please unlock it.");
          setDeviceState(DeviceState.LOCKED);
        } else if (err.statusCode === LEDGER_STATUS_CODES.APP_NOT_OPEN || err.statusCode === LEDGER_STATUS_CODES.APP_NOT_OPEN_ALT) {
          setError("Please open the Ethereum app on your Ledger device.");
          setDeviceState(DeviceState.NO_APP);
        } else if (err.name === "DisconnectedDevice" || err.name === "DisconnectedDeviceDuringOperation") {
          handleDisconnect();
        } else if (err.statusCode === LEDGER_STATUS_CODES.USER_REJECTED) {
          setError("Transaction was rejected on Ledger device. Please try again.");
          setApprovalState(ApprovalState.CONNECTED);
          toast.error("Transaction rejected", { id: "ledger-sign" });
        } else {
          setError("Failed to sign or submit transaction. Please try again.");
          setApprovalState(ApprovalState.CONNECTED);
        }
        
        if (err.statusCode !== LEDGER_STATUS_CODES.USER_REJECTED) {
          setApprovalState(ApprovalState.ERROR);
          toast.error("Failed to sign or submit transaction", { id: "ledger-sign" });
        }
      } finally {
        setIsWaitingForSignature(false); // Resume device state checks
      }
    } catch (e: any) {
      console.error("Signing error:", e);
      if (e.name === "DisconnectedDevice" || e.name === "DisconnectedDeviceDuringOperation") {
        handleDisconnect();
      } else {
        setError(e.message || "Failed to sign transaction");
        setApprovalState(ApprovalState.ERROR);
      }
      setIsWaitingForSignature(false); // Resume device state checks
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
          {/* Device Status Display */}
          <div className="flex items-center gap-4">
            <Icon 
              icon={deviceState === DeviceState.READY ? "icon-park-outline:check-one" : "icon-park-outline:close-one"} 
              className={`w-28 h-28 ${deviceState === DeviceState.READY ? "text-success" : "text-error"} mr-20`} 
            />
            <span className="text-xl">
              {deviceState === DeviceState.READY ? "Ready" :
               deviceState === DeviceState.LOCKED ? "Device Locked" :
               deviceState === DeviceState.NO_APP ? "Open Ethereum App" :
               "Disconnected"}
            </span>
          </div>

          {/* Address Display */}
          <div className="text-xl">
            <span>Address: </span>
            {deviceState === DeviceState.READY && address ? (
              <span>{address}</span>
            ) : (
              <span className="text-gray-400">Connect Ledger to load address</span>
            )}
          </div>

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
            <div className="flex justify-center">
              <button
                onClick={handleConnect}
                className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
              >
                Connect Ledger
                <Icon icon="material-symbols:usb" className="w-20 h-20 ml-8" />
              </button>
            </div>
          )}

          {approvalState === ApprovalState.CONNECTED && (
            <div className="flex flex-col items-center gap-12">
              <button
                onClick={lastSignature ? handleRetrySubmit : handleSign}
                disabled={(!lastSignature && (!recipientAddress || !!recipientError || deviceState !== DeviceState.READY))}
                className="mt-16 w-full md:w-300 text-button-text text-18 font-semibold py-16 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {lastSignature ? "Retry Submit" : "Sign Transaction"}
                <Icon icon={lastSignature ? "material-symbols:refresh" : "material-symbols:approval-outline"} className="w-20 h-20 ml-8" />
              </button>
              {lastSignature && (
                <button
                  onClick={() => {
                    setLastSignature(null);
                    setError("");
                  }}
                  className="text-secondary-400 text-14 hover:text-secondary-300"
                >
                  Clear signature and sign again
                </button>
              )}
            </div>
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
