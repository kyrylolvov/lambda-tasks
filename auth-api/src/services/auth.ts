import crypto from 'crypto';
import { Response } from 'express';

import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { ApiAuthTokens } from '../types/jwt.js';
import { User } from '../types/user.js';
import { create, getByEmail, getById } from '../database/users.js';
import { Authentication } from '../types/auth.js';
import { ObjectId } from 'mongodb';

const createAuthTokens = (user: User): ApiAuthTokens => {
  const accessToken = createAccessToken({ id: user.id, email: user.email });
  const refreshToken = createRefreshToken({ id: user.id, email: user.email });

  return {
    accessToken,
    refreshToken,
  };
};

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const compareHashPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

export const signUpService = async (res: Response, body: Authentication): Promise<Response> => {
  const { email, password } = body;

  const isExistByEmail: boolean = Boolean(await getByEmail(email));
  if (isExistByEmail) {
    throw new Error(`User with this email already exists`);
  }

  const hashedPassword = hashPassword(password);

  await create({ email, password: hashedPassword });

  return res;
};

export const loginService = async (res: Response, body: Authentication): Promise<Response> => {
  const { email, password } = body;

  const user = await getByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = compareHashPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const apiAuthTokens: ApiAuthTokens = createAuthTokens(user);

  return res.json(apiAuthTokens);
};

export const refreshAccessTokenService = async (res: Response, refreshToken: string): Promise<Response> => {
  const decodedToken = verifyRefreshToken(refreshToken);
  if (!decodedToken) {
    throw new Error("Can't find user from token");
  }

  const user = await getById(new ObjectId(decodedToken.id));
  if (!user) {
    throw new Error(`Can't find user by refresh token`);
  }

  const apiAuthTokens: ApiAuthTokens = {
    accessToken: createAccessToken({ id: user.id, email: user.email }),
    refreshToken,
  };

  return res.json(apiAuthTokens);
};
