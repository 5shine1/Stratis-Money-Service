"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import useAppSelector from "@/hooks/global/useAppSelector";
import { dictionaryCustody } from "@/config/dictionary";

const NoWallet = () => {
  const {locale} = useAppSelector((state)=>state.locale);
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-24 w-full max-w-400">
        <Icon icon="hugeicons:wallet-add-01" className="text-72 text-secondary-200" />
        <div className="text-center">{dictionaryCustody.nowallet.createwalletexp[locale]}</div>
        <button className="w-fit text-button-text font-semibold p-32 text-16 py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50">
          {dictionaryCustody.nowallet.createwallet[locale]}
          <Icon icon={"akar-icons:arrow-cycle"} className="w-16 h-16" />
        </button>
      </div>
    </div>
  );
};

export default NoWallet;
