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
}

export interface IUser {
  userId: string;
  country: string;
  email: string;
  isAdmin: boolean;
  isBusiness: boolean;
  isKnowYourBusinessCompleted: boolean;
  isKnowYourBusinessPassed: boolean;
  isVerifiedEmail: boolean;
  knowYourBusinessLink: null | string;
  mobileNumber: string;
  name: string;
}
