export interface IIcon {
  className: string;
}

export interface ICurrency {
  img?: string;
  id: string;
}

export interface IAuth {
  userId: string;
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  isAuthLoading: boolean;
  isVerifiedEmail: boolean;
  role: ROLES;
}

export enum ROLES {
  ADMIN = "admin",
  BUSINESS = "business",
  GUEST = "guest",
}
