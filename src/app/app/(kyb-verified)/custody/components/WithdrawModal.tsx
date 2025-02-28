import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "react-modal";
import { getChainInfo } from "@/utils/web3.utils";

import useAppSelector from "@/hooks/global/useAppSelector";
import { acceptableCurrencies } from "../deposit/data";
import { dictionaryPayment, dictionaryWithdraw } from "@/config/dictionary";
import CustomSelect from "@/components/global/CustomSelect";
import AppInput from "@/components/global/AppInput";
import IconBox from "@/components/global/IconBox";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  availableCurrencies: any[];
};

const WithdrawModal: React.FC<Props> = ({ isOpen, onClose, availableCurrencies }) => {
  const { locale } = useAppSelector((state) => state.locale);
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState(0);
  const [network, setNetwork] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState({error: "", value: ""});
  
  const networkList = useMemo(
    () =>
      currencies
        .filter((item, index, self) => index === self.findIndex((t) => t.chainName === item.chainName))
        .map((item, id) => {
          return { ...item, id, text: item.chainName };
        }),
    [currencies]
  );

  const currencyList = useMemo(
    () =>
      currencies
        .filter((item) => {
          return item.chainName === networkList[network]?.text;
        })
        .map((item, id) => {
          return { ...item, id };
        }),
    [currencies, network, networkList]
  );  

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (acceptableCurrencies) {
        const currencyPromises = acceptableCurrencies.map(async (item, i) => {
          const chain = await getChainInfo(item?.chainId);
          return {
            id: i,
            key: item?.currencyId,
            text: item?.symbol,
            icon: item?.icon,
            chainName: chain.name,
            chainId: item?.chainId,
          };
        });
        const resolvedCurrencies = await Promise.all(currencyPromises);
        setCurrencies(resolvedCurrencies);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConnect = () => {
    if (!paymentAmount.value || paymentAmount.value > availableCurrencies.find((item) => item.symbol === currencyList[currency].text).amount) {
      setPaymentAmount({...paymentAmount, error: "Invalid amount"});
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterClose={() => {
        setPaymentAmount({ value: "", error: "" });
        setCurrency(0);
        setNetwork(0);
      }}
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
          <IconBox icon="mdi-light:credit-card" />
          <h4 className="g-button-text w-fit mt-4 md:mt-3 mr-30">{dictionaryWithdraw.withdrawPage.headings.custody[locale]}</h4>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <div className="text-input-label text-14">
                {dictionaryPayment.labels.selectNetwork[locale]}
              </div>
              <CustomSelect
                data={networkList}
                init={networkList[network]}
                onChange={(selected) => {
                  setNetwork(selected.id);
                  setCurrency(0);
                }}
                mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
              ></CustomSelect>
            </div>
            <div className="flex flex-col gap-8">
              <div className="text-input-label text-14">
                {dictionaryPayment.labels.selectCurrency[locale]}
              </div>
              <CustomSelect
                data={currencyList}
                init={currencyList[currency]}
                onChange={(selected) => {
                  setCurrency(selected.id);
                }}
                mainClass="border border-input-border text-input-text rounded-8 py-12 px-16 cursor-pointer u-text-overflow"
                padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto rounded-8 bg-[#192C37] border border-[#213541] shadow-tab overflow-y-auto z-10"
                listClass="p-16 cursor-pointer u-text-overflow rounded-4 border-b border-[#213541] last:border-b-0"
                isIcon={true}
              ></CustomSelect>
            </div>
            <div>
              <AppInput
                value={paymentAmount.value}
                onChange={(e) => {
                  setPaymentAmount({ error: "", value: e });
                }}
                placeholder="0"
                label={dictionaryWithdraw.requestModal.labels.amount[locale]}
                error={paymentAmount.error}
                pattern="^([0-9]+(?:[.][0-9]*)?)$"
                inputMode="decimal"
              />
            </div>
          </div>
          <button
            onClick={handleConnect}
            className="w-full max-w-500 text-button-text text-18 font-semibold py-16  rounded-12 gap-8 flex items-center justify-center border border-button-border bg-gradient-to-r from-button-from/10 to-button-to/10 transition-all duration-300 hover:from-button-from/50 hover:to-button-to/50"
          >
            {dictionaryPayment.buttons.continue[locale]}
            <Icon icon={"octicon:arrow-right-16"} className="w-16 h-16" />
          </button>
      </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
