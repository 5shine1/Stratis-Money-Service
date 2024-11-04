export interface IPayment {
  paymentId: string;
  state: number;
  requested: string;
  amount: number;
  currency: string;
  payer: string;
  payee: string;
  description: string;
  customerName?: string;
  customerAddress?: string;
  customerDateOfBirth?: string;
  customerPlaceOfBirth?: string;
  paymentAddress?: string;
  paymentAmount?: number;
  paymentCurrency?: string;
  paymentTransaction?: string;
  paymentChainId?: number;
  lastConfirmationCheck?: string;
}

export interface IUser {
  userId: string;
  country: string;
  email: string;
  isAdmin: boolean;
  role: string;
  isBusiness: boolean;
  isKnowYourBusinessCompleted: boolean;
  isKnowYourBusinessPassed: boolean;
  isVerifiedEmail: boolean;
  knowYourBusinessLink: null | string;
  mobileNumber: string;
  name: string;
  industry?: string;
  activity?: string;
  volume?: string;
  totalBalance?: { EUR: number; USD: number };
  transactionCount?: number;
  transactionVolume?: { EUR: number; USD: number };
}

export interface IWithdrawHistory {
  withdrawalId: string;
  userId: string;
  requested: string;
  completed: boolean;
  amount: number;
  fee: number;
  currency: string;
  status: number;
}

export interface IAgent {
  agentId: string;
  country: string;
  email: string;
  mobileNumber: string;
  name: string;
}
