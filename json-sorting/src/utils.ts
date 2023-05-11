import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { JSONBASE_API_URL } = process.env;

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
  }
}

export interface IObject {
  isDone: boolean;
  [key: string]: any;
}

axios.interceptors.response.use(undefined, async (err: AxiosError) => {
  const { config, message } = err;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  if (!(message.includes('timeout') || message.includes('Network Error')) || message.includes('Request failed with status code 404')) {
    return Promise.reject(err);
  }

  config.retry -= 1;

  const delayRetryRequest = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay);
  });

  await delayRetryRequest;
  return await axios(config);
});

export const getData = async (id: number) => {
  try {
    const { data } = await axios.get<IObject>(`${JSONBASE_API_URL}/${id}`, { retry: 3, retryDelay: 3000 });
    return data;
  } catch (error: any) {
    console.log(`${JSONBASE_API_URL}/${id}: ${error.message}`);
    return;
  }
};
