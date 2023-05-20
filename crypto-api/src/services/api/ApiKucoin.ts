import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { KUCOIN_API_URL } = process.env;

interface KucoinCrypto {
  data: {
    [key: string]: string;
  };
}

export class ApiKucoin {
  constructor() {}

  public getData = async () => {
    try {
      const { data } = await axios.get<KucoinCrypto>(KUCOIN_API_URL!);

      return data.data;
    } catch (err: any) {
      console.log(err.message);
    }
  };
}
