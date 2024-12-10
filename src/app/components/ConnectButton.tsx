import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount, useSendTransaction, createConfig, http } from "wagmi";
import { ethers } from 'ethers';
import { mainnet, sepolia } from "wagmi/chains";

const ConnectButton = ({ chain, amount, paymentDestination }) => {

  const account = useAccount();
  const { openConnectModal } = useConnectModal();


  const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })

  const { sendTransaction } = useSendTransaction({config});
  return (
    account.address ? (
      <>
        <button
          className="w-full max-w-320 text-button-text text-12 font-semibold py-12 rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          onClick={() => sendTransaction({
            to: paymentDestination,
            value: ethers.parseEther(amount.toString()),
            chainId: chain,
          })}
        >
          Pay Now
        </button>
      </>
    ) : (
      <button className="w-full max-w-320 text-button-text text-12 font-semibold py-12  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50" onClick={openConnectModal}>
        Connect Wallet
      </button>
    )
  );
};

export default ConnectButton;
