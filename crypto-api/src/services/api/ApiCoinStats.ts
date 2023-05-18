import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { COINSTATS_API_URL } = process.env;

interface CoinStatsCrypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  volume: number;
}

export class ApiCoinStats {
  constructor() {}

  public getData = async () => {
    try {
      const { data } = await axios.get<{ coins: CoinStatsCrypto[] }>(COINSTATS_API_URL!);

      return data.coins;
    } catch (err: any) {
      console.log(err.message);
    }
  };
}
