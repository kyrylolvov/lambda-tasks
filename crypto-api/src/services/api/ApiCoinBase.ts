import axios from 'axios';
import dotenv from 'dotenv';
import { ApiCrypto, Crypto, CryptoMarkets } from '../../types/crypto.js';

dotenv.config();

const { COINBASE_API_URL } = process.env;

interface CoinBaseCrypto {
  rates: {
    [key: string]: string;
  };
}

export class ApiCoinBase implements ApiCrypto<CoinBaseCrypto> {
  constructor() {}

  public formatData = (data: CoinBaseCrypto): Crypto[] => {
    const result = Object.entries(data.rates).map((rate, i) => ({
      name: rate[0],
      price: Number(rate[1]),
      market: CryptoMarkets.COINBASE,
      date: new Date(),
    }));

    return result;
  };

  public getData = async () => {
    try {
      const { data } = await axios.get<{ data: CoinBaseCrypto }>(COINBASE_API_URL!);

      const result = this.formatData(data.data);

      return result;
    } catch (err: any) {
      console.log(err.message);
    }
  };
}
