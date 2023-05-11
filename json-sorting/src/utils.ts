import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { JSONBASE_API_URL } = process.env;

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number;
  }
}

export interface IObject {
  isDone: boolean;
  [key: string]: any;
}

axios.interceptors.response.use(undefined, async (err: AxiosError) => {
  const { config } = err;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  config.retry -= 1;

  const delayRetryRequest = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  await delayRetryRequest;
  return await axios(config);
});

export const getData = async (id: number) => {
  try {
    const { data } = await axios.get<IObject>(`${JSONBASE_API_URL}/${id}`, { retry: 3 });
    return data;
  } catch (error: any) {
    console.log(`${JSONBASE_API_URL}/${id}: ${error.message}`);
    return;
  }
};
