import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { COINMARKETCAP_API_URL, COINMARKETCAP_API_KEY } = process.env;

interface CoinMarketCapCrypto {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  last_updated: string;
  quote: {
    USD: CoinMarketCapQuote;
  };
}

interface CoinMarketCapQuote {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  last_updated: string;
}

export class ApiCoinMarketCap {
  constructor() {}

  public getData = async () => {
    try {
      const { data } = await axios.get<{ data: CoinMarketCapCrypto[] }>(COINMARKETCAP_API_URL!, {
        headers: { 'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY },
      });

      return data.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
}
