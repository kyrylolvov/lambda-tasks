import dotenv from 'dotenv';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

// Settings .env variables so that telegram-bot-api stops showing warnings
process.env.NTBA_FIX_319 = '1';
process.env.NTBA_FIX_350 = '0';

dotenv.config();

const { TELEGRAM_BOT_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN!, { polling: true });

console.log('Telegram bot successfully started!\n');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  console.log(`User ${msg.from?.first_name} messaged ${msg.text}`);

  if (msg.text === 'photo') {
    try {
      const response = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      await bot.sendPhoto(chatId, buffer);
    } catch (error) {
      console.error('Error fetching photo:', error);
      await bot.sendMessage(chatId, 'Sorry, there was an error fetching the photo.');
    }
    return;
  }

  await bot.sendMessage(chatId, `You have messaged ${msg.text}`);
});
