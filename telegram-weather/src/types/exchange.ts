export interface ICurrency {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
}

export enum ECurrencyCode {
  USD = 840,
  EUR = 978,
}

export interface ISavedCurencies {
  [ECurrencyCode.USD]: ICurrency;
  [ECurrencyCode.EUR]: ICurrency;
}
