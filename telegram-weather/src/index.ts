import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

import { startMenuOptions, weatherMenuOptions } from './view.js';
import { sendWeather } from './controller.js';

dotenv.config();

const { TELEGRAM_BOT_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

console.log('Telegram bot successfully started!\n');

bot.onText(/\/start|Back to Main Menu/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Start menu', startMenuOptions);
});

bot.onText(/Weather in Toronto/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Select a time interval', weatherMenuOptions);
});

bot.onText(/Three-Hour Period/, (msg) => {
  sendWeather(bot, msg, 3);
});

bot.onText(/Six-Hour Period/, (msg) => {
  sendWeather(bot, msg, 6);
});
