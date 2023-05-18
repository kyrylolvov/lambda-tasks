import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { COINBASE_API_URL } = process.env;

interface CoinBaseCrypto {
  currency: string;
  rates: {
    [key: string]: string;
  };
}

export class ApiCoinBase {
  constructor() {}

  public getData = async () => {
    try {
      const { data } = await axios.get<{ data: CoinBaseCrypto }>(COINBASE_API_URL!);

      return data.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
}
