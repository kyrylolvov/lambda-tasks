// bank/currency
import axios from 'axios';
import dotenv from 'dotenv';

import { ECurrencyCode, ICurrency, ISavedCurencies } from '../types/exchange.js';

dotenv.config();

const { EXCHANGE_API_URL } = process.env;

const API_REFRESH_TIME = 60 * 1000 * 5;

let savedExchangeRates: ISavedCurencies | null = null;
let lastFetched: number | null = null;

export const getExchangeRatesData = async () => {
  const currentTime = Date.now();

  if (lastFetched === null || currentTime - lastFetched > API_REFRESH_TIME) {
    try {
      const { data } = await axios.get<ICurrency[]>(`${EXCHANGE_API_URL}/bank/currency`);

      const usd = data.find((exchangeRate) => exchangeRate.currencyCodeA === ECurrencyCode.USD);
      const eur = data.find((exchangeRate) => exchangeRate.currencyCodeA === ECurrencyCode.EUR);

      savedExchangeRates = { [ECurrencyCode.USD]: usd!, [ECurrencyCode.EUR]: eur! };
      lastFetched = currentTime;
    } catch (err: any) {
      console.error('Error fetching exchange rates:', err);
    }
  }

  return savedExchangeRates;
};
