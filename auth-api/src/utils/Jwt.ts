import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { TokenData } from '../types/jwt.js';

dotenv.config();

const { JWT_SECRET } = process.env;

interface CreateToken {
  id: string;
  email: string;
}

const getRandomAccessTokenTime = () => {
  const time = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
  return `${time}s`;
};

export const createAccessToken = (data: CreateToken): string => {
  const { id, email } = data;

  const accessToken = jwt.sign({ id, email, type: 'ACCESS' }, JWT_SECRET!, { expiresIn: getRandomAccessTokenTime() });

  return accessToken;
};

export const createRefreshToken = (data: CreateToken): string => {
  const { id, email } = data;

  const refreshToken = jwt.sign({ id, email, type: 'REFRESH' }, JWT_SECRET!, { expiresIn: '30d' });

  return refreshToken;
};

export const verifyAccessToken = (token: string): TokenData => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as TokenData;

    if (decoded.type !== 'ACCESS') {
      throw new Error('Wrong token type');
    }

    return decoded;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const verifyRefreshToken = (refreshToken: string): TokenData => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET!) as TokenData;

    if (decoded.type !== 'REFRESH') {
      throw new Error('Wrong token type');
    }

    return decoded;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
