import axios from 'axios';
import dotenv from 'dotenv';
import { IForecast } from '../types/weather.js';

dotenv.config();

const { WEATHER_API_TOKEN, WEATHER_API_URL } = process.env;

export const getWeatherData = async () => {
  const { data } = await axios.get<{ list: IForecast[] }>(WEATHER_API_URL!, {
    params: {
      appid: WEATHER_API_TOKEN,
      q: 'Toronto',
      units: 'metric',
    },
  });

  return data.list;
};
