import fs from 'fs';
import dotenv from 'dotenv';
import { program } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const { TELEGRAM_BOT_TOKEN, CHAT_ID } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: false });

program.helpOption('-h, --help', 'Display help for commands');

program
  .command('message <text>')
  .alias('m')
  .description('Send a message to chat, need to provide a text message')
  .action(async (text) => {
    await bot.sendMessage(CHAT_ID!, text);
    process.exit();
  });

program
  .command('photo <filepath>')
  .alias('p')
  .description('Send a photo to chat, need to provide a file path')
  .action(async (filepath) => {
    const photo = fs.createReadStream(filepath);
    await bot.sendPhoto(CHAT_ID!, photo);
    process.exit();
  });

program.parse(process.argv);
