import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

import { sendWeather } from './controllers/weather.js';
import { startMenuOptions } from './views/common.js';
import { weatherMenuOptions } from './views/weather.js';
import { exchangeMenuOptions } from './views/exchange.js';
import { sendExchangeRates } from './controllers/exchange.js';

dotenv.config();

const { TELEGRAM_BOT_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

console.log('Telegram bot successfully started!\n');

bot.onText(/\/start|Back to Main Menu/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Start menu', startMenuOptions);
});

bot.onText(/Weather Forecast/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Select time interval', weatherMenuOptions);
});

bot.onText(/Three-Hour Period/, (msg) => {
  sendWeather(bot, msg, 3);
});

bot.onText(/Six-Hour Period/, (msg) => {
  sendWeather(bot, msg, 6);
});

bot.onText(/Exchange Rates/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Select currency', exchangeMenuOptions);
});

bot.onText(/USD/, (msg) => {
  sendExchangeRates(bot, msg, 'USD');
});

bot.onText(/EUR/, (msg) => {
  sendExchangeRates(bot, msg, 'EUR');
});
