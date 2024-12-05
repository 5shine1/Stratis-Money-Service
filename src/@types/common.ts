export interface IIcon {
  className?: string;
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
  totalBalance?: { EUR: number; USD: number };
  kybApplicationStatus?: number;
  acceptNonStablecoinPayments?: boolean;
}

export interface IInputSelectItem {
  group: string;
  items: string[];
}

export enum ROLES {
  ADMIN = "Admin", //eslint-disable-line
  BUSINESS = "Business", //eslint-disable-line
  COMPLIANCE = "Compliance", //eslint-disable-line
  AGENT = "Agent", //eslint-disable-line
  GUEST = "Guest", //eslint-disable-line
}

export const WITHDRAW_STATE = {
  0: "Pending",
  1: "Completed",
  2: "Cancelled",
};

export const KYB_STATUS = {
  1: "Pending", // KYB process hasn't started
  2: "TimedOutByKybProvider", // KYB process timed out
  3: "DeclinedByKybProvider", // KYB verification was declined by Shufti
  4: "AcceptedByKybProvider", // KYB verification is accepted and verified by Shufti
  5: "ApprovedByCompliance", // KYB verification was manually approved by Compliance officer
  6: "RejectedByCompliance", // KYB verification was manually rejected by Compliance officer
};
