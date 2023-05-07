import TelegramBot, { Message } from 'node-telegram-bot-api';
import { getWeatherData } from './model';
import { IForecast, IGroupedForecasts } from './types';

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
  return date.toLocaleString('en-US', options);
};

const formatForecasts = (forecasts: IForecast[]) => {
  const groupedForecasts: Record<string, IGroupedForecasts> = {};

  forecasts.map((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const formattedDate = formatDate(date);

    if (!groupedForecasts[formattedDate]) {
      groupedForecasts[formattedDate] = {
        dt: forecast.dt,
        forecasts: [],
      };
    }

    groupedForecasts[formattedDate].forecasts.push({
      dt: forecast.dt,
      temp: forecast.main.temp,
      feels_like: forecast.main.feels_like,
      weatherDescription: forecast.weather[0].description,
    });
  });

  return Object.values(groupedForecasts);
};

const displayForecasts = (groupedForecasts: IGroupedForecasts[]) => {
  let result = 'Weather in Toronto:\n\n';

  groupedForecasts.map((groupedForecast) => {
    const date = new Date(groupedForecast.dt * 1000);
    result += `${formatDate(date)}:\n`;

    groupedForecast.forecasts.map((forecast) => {
      const time = new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const tempSign = forecast.temp >= 0 ? '+' : '-';
      const feelsLikeSign = forecast.feels_like >= 0 ? '+' : '-';

      result += `\t\t${time} ${tempSign}${forecast.temp.toFixed(0)}°C, feels like ${feelsLikeSign}${forecast.feels_like.toFixed(0)}°C, ${forecast.weatherDescription}\n`;
    });

    result += '\n';
  });

  return result;
};

export const sendWeather = async (bot: TelegramBot, msg: Message, interval: 3 | 6) => {
  let forecasts = await getWeatherData();

  if (interval === 6) forecasts = forecasts.filter((_, index) => index % 2 === 0);

  const formattedForecasts = formatForecasts(forecasts);

  bot.sendMessage(msg.chat.id, displayForecasts(formattedForecasts));
};
