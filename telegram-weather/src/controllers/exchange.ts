import TelegramBot, { Message } from 'node-telegram-bot-api';

import { getExchangeRatesData } from '../models/exchange.js';
import { ECurrencyCode, ICurrency } from '../types/exchange.js';

export const displayExchangeRates = (currency: ICurrency) => {
  return `Current exchange rate for ${ECurrencyCode[currency.currencyCodeA]}: ${currency.rateBuy}₴`;
};

export const sendExchangeRates = async (bot: TelegramBot, msg: Message, currency: keyof typeof ECurrencyCode) => {
  const exchangeRates = await getExchangeRatesData();

  if (exchangeRates) bot.sendMessage(msg.chat.id, displayExchangeRates(exchangeRates[ECurrencyCode[currency]]));
  else bot.sendMessage(msg.chat.id, "Couldn't get exchange rate");
};
