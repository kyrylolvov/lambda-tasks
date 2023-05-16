import * as jwt from 'jsonwebtoken';

import { TokenData } from '../types/Jwt.js';
import { IError } from '../errors/CustomErrors.js';

const { JWT_SECRET } = process.env;

interface CreateToken {
  id: number;
  email: string;
}

export class Jwt {
  private readonly SECRET: string = JWT_SECRET!;
  private readonly REFRESH_TOKEN_TIME: string = '180d';

  public constructor() {}

  public getRandomAccessTokenTime() {
    const time = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    return `${time}s`;
  }

  public createAccessToken = (data: CreateToken): string => {
    const { id, email } = data;

    const accessToken = jwt.sign({ id, email, type: 'ACCESS' }, this.SECRET, { expiresIn: this.getRandomAccessTokenTime() });

    return accessToken;
  };

  public createRefreshToken = (data: CreateToken): string => {
    const { id, email } = data;

    const refreshToken = jwt.sign({ id, email, type: 'REFRESH' }, this.SECRET, { expiresIn: this.REFRESH_TOKEN_TIME });

    return refreshToken;
  };

  public verifyAccessToken = (token: string): TokenData => {
    try {
      const decoded = jwt.verify(token, this.SECRET) as TokenData;

      if (decoded.type !== 'ACCESS') {
        throw new Error('Wrong token type');
      }

      return decoded;
    } catch (e: any) {
      throw new IError(e.message);
    }
  };

  public verifyRefreshToken = (refreshToken: string): TokenData => {
    try {
      const decoded = jwt.verify(refreshToken, this.SECRET) as TokenData;

      if (decoded.type !== 'REFRESH') {
        throw new Error('Wrong token type');
      }

      return decoded;
    } catch (e: any) {
      throw new IError(e.message);
    }
  };
}
