import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useWriteContract, useSwitchChain } from "wagmi";
import { erc20Abi, parseEther } from "viem";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryPayment } from "@/config/dictionary";

const ConnectButton = ({ chainProp, amount, paymentDestination, selectedCurrency }) => {
  const account = useAccount();
  const { switchChain } = useSwitchChain();
  const [chain, setChain] = useState(chainProp);
  const { openConnectModal } = useConnectModal();

  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { data: contractTxHash, isPending: isContractPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { isLoading: isContractConfirming, isSuccess: isContractConfirmed } = useWaitForTransactionReceipt({
    hash: contractTxHash,
  });

  useEffect(() => {
    setChain(chainProp);
  }, [chainProp]);

  const value = parseEther(amount.toString());

  const { locale } = useAppSelector((state) => state.locale);

  const handleMakePayment = async () => {
    switchChain({ chainId: chain.id });
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
        functionName: "transfer",
        args: [paymentDestination, BigInt(amount * Math.pow(10, selectedCurrency.decimals))],
        chain: chain,
        account: account.address,
      });
    }
  };

  return account.address ? (
    <>
      {!isConfirmed && !isContractConfirmed && (
        <button
          type="button"
          disabled={isPending || isConfirming || isContractPending || isContractConfirming}
          className=" text-button-text w-full max-w-240 text-16 font-semibold py-12 px-36 whitespace-nowrap rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          onClick={handleMakePayment}
        >
          {isPending || isConfirming || isContractPending || isContractConfirming
            ? dictionaryPayment.buttons.confirming[locale]
            : dictionaryPayment.buttons.payNow[locale]}
        </button>
      )}
    </>
  ) : (
    <button
      className=" text-button-text w-full max-w-240 text-16 font-semibold py-12 px-36 whitespace-nowrap rounded-12 gap-8 border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
      onClick={openConnectModal}
    >
      {dictionaryPayment.buttons.connectWallet[locale]}
    </button>
  );
};

export default ConnectButton;
