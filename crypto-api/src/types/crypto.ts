export interface Crypto {
  market: CryptoMarkets;
  name: string;
  price: number;
  date: Date;
}

export enum CryptoMarkets {
  COINBASE = 1,
}

export interface ApiCrypto<T> {
  formatData: (data: T) => Crypto[];
  getData: () => Promise<Crypto[] | undefined>;
}
