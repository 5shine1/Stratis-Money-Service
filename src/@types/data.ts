export interface IPayment {
  paymentId: string;
  state: number;
  requested: string;
  amount: number;
  currency: string;
  payer: string;
  payee: string;
  description: string;
}
