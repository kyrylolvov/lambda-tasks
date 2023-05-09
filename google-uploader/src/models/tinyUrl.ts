import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const { TINY_URL_API_URL, TINY_URL_TOKEN } = process.env;

const minimizeUrl = async (url: string) => {
  try {
    const { data } = await axios.post<{ data: { tiny_url: string } }>(
      `${TINY_URL_API_URL}/create`,
      {
        url,
      },
      {
        headers: {
          Authorization: 'Bearer ' + TINY_URL_TOKEN,
        },
      },
    );

    return data.data.tiny_url;
  } catch (err) {
    throw err;
  }
};

export { minimizeUrl };
