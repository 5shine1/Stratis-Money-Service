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
