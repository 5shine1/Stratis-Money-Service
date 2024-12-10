import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { erc20Abi, parseEther } from "viem";

const ConnectButton = ({ chain, amount, paymentDestination, selectedCurrency }) => {

  const account = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { data: contractTxHash, isPending: isContractPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { isLoading: isContractConfirming, isSuccess: isContractConfirmed } = useWaitForTransactionReceipt({ hash: contractTxHash });
  
  const value = parseEther(amount.toString());

  const handleMakePayment = async () => {
    if (selectedCurrency.isNative) {
      sendTransaction({
        to: paymentDestination,
        value: value,
        chainId: chain.id,
      });
    } else {
      writeContract({
        abi: erc20Abi,
        address: selectedCurrency.tokenContract,
        functionName: 'transferFrom',
        args: [
          account.address,
          paymentDestination,
          BigInt(amount * Math.pow(10, selectedCurrency.decimals)),
        ],
        chain: chain,
        account: account.address
      })
    }
  };

  return (
    account.address ? (
      <>
        {!isConfirmed && !isContractConfirmed && (<button
          type="button"
          disabled={isPending || isConfirming || isContractPending || isContractConfirming}
          className="w-full max-w-320 text-button-text text-12 font-semibold py-12 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          onClick={handleMakePayment}
        >
          {isPending || isConfirming || isContractPending || isContractConfirming ? 'Confirming...' : 'Pay Now'}
        </button>)}
      </>
    ) : (
      <button className="w-full max-w-320 text-button-text text-12 font-semibold py-12  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50" onClick={openConnectModal}>
        Connect Wallet
      </button>
    )
  );
};

export default ConnectButton;
