import axios from 'axios';
import dotenv from 'dotenv';
import { IForecast } from './types';

dotenv.config();

const { WEATHER_API_TOKEN } = process.env;

export const getWeatherData = async () => {
  const { data } = await axios.get<{ list: IForecast[] }>(`https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=${WEATHER_API_TOKEN!}&units=metric`);

  return data.list;
};
