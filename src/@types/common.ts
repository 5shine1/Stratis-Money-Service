export interface IIcon {
  className: string;
}

export interface ICurrency {
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
  role: ROLES;
}

export enum ROLES {
  ADMIN = "Admin",
  BUSINESS = "Business",
  GUEST = "Guest",
}

export const PAYMENT_STATE = {
  10: "Requested",
  20: "LinkCreated",
  30: "KycNewUser",
  40: "KycExistingUser",
  50: "RequireDepositAddress",
  60: "AwaitingDeposit",
  70: "AddressComplianceCheck",
  80: "ReferComplianceTeam",
  90: "ComplianceCheckPassed",
  100: "AwaitTransactionConfirmation",
  110: "AwaitConversion",
  120: "InitiateFiatTransfer",
  130: "FiatTransferComplete",
};
