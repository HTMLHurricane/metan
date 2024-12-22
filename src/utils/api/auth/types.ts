export interface ILoginCredentials {
  phone_number: string;
}

export interface ILoginResponseData {
  message: string;
  data: ILoginResponse;
}

export interface ILoginResponse {
  timestamp: number;
}

export interface IVerifyResponseData {
  message: string;
  data: IVerifyResponse;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface IVerifyResponse extends Tokens {
  is_signed_up: boolean;
  id: string;
}

export interface IVerifyPost {
  phone_number: string;
  code: string;
}

export interface IAuthDetailResponseData {
  message: string;
  data: IAuthDetailResponse;
}

export interface IAuthDetailResponse {}

export interface IAuthDetailPost {
  name: string;
  number: string;
}


export interface IRefreshTokensDataResponse {
  status: string;
  message: string;
  data: IRefreshTokensData;
}

export interface IRefreshTokensData {
  token: Token;
}

export interface Token {
  access: string;
}
