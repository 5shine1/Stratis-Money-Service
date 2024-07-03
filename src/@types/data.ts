export interface IPayment {
  status: {
    paymentId: string;
    state: number;
    amount: number;
    currency: {
      currencyId: number;
      name: string;
      symbol: string;
      isFiat: boolean;
    };
  };
  payer: string;
  paidCurrency: {
    currencyId: number;
    name: string;
    symbol: string;
    isFiat: boolean;
  };
  paidAmount: number;
}
