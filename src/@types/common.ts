export interface IIcon {
  className: string;
}

export interface ICurrency {
  chainId: number;
  liquidationConfirmations: number;
  depositConfirmations: number;
  icon: string;
  currencyId: number;
  name: string;
  symbol: string;
  isFiat: boolean;
}

export interface IAuth {
  userId: string;
  email: string;
  name: string;
  isAuthLoading: boolean;
  isVerifiedEmail: boolean;
  isKnowYourBusinessCompleted: boolean;
  isKnowYourBusinessPassed: boolean;
  role: ROLES;
  country: string;
  mobileNumber: string;
}

export interface IInputSelectItem {
  group: string;
  items: string[];
}

export enum ROLES {
  ADMIN = "Admin", //eslint-disable-line
  BUSINESS = "Business", //eslint-disable-line
  GUEST = "Guest", //eslint-disable-line
}

export const PAYMENT_STATE = {
  10: "Requested",
  20: "LinkCreated",
  30: "KycNewUser",
  40: "KycExistingUser",
  50: "Require Deposit Address",
  55: "Expired",
  60: "Awaiting Deposit",
  70: "AddressComplianceCheck",
  80: "ReferComplianceTeam",
  90: "ComplianceCheckPassed",
  100: "AwaitTransactionConfirmation",
  110: "AwaitConversion",
  120: "InitiateFiatTransfer",
  130: "FiatTransferComplete",
  200: "Completed",
};

export const FIAT_CURRENCIES = [
  {
    currencyId: 0,
    name: "US DOLLAR",
    symbol: "USD",
    isFiat: true,
  },
  {
    currencyId: 1,
    name: "EURO",
    symbol: "EUR",
    isFiat: true,
  },
  {
    currencyId: 2,
    name: "GB POUND",
    symbol: "GBP",
    isFiat: true,
  },
];
