import { Request, Response } from 'express';
import { loginService, refreshAccessTokenService, signUpService } from '../services/auth.js';
import { Authentication } from '../types/auth.js';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    if (!body.email || !body.password) {
      throw new Error("Can't find email or password");
    }

    const response: Response = await signUpService(res, body);

    return response.status(200).json({ message: 'User successfully created!' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const body: Authentication = req.query;

    const response: Response = await loginService(res, body);

    return response.status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    const refreshToken = authorization ? authorization.split(' ')[1] : null;
    if (!refreshToken) {
      throw new Error("Can't find refresh token");
    }

    const response: Response = await refreshAccessTokenService(res, refreshToken);

    return response.status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};
