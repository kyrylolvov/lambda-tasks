import { Request, Response } from 'express';
import { getMeService } from '../services/user.js';

export const getMe = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    const accessToken = authorization ? authorization.split(' ')[1] : null;
    if (!accessToken) {
      throw new Error("Can't find refresh token");
    }

    const { originalUrl } = req;

    const match = originalUrl.match(/\/me([0-9])/);

    const requestNumber = match && match[1].length === 1 ? parseInt(match[1]) : null;
    if (!requestNumber) {
      throw new Error('Incorrect request path');
    }

    const response: Response = await getMeService(res, accessToken, requestNumber);

    return response.status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};
