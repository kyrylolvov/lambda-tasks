import { Response } from 'express';
import { ObjectId } from 'mongodb';

import { verifyAccessToken } from '../utils/jwt.js';
import { getById } from '../database/users.js';

export const getMeService = async (res: Response, accessToken: string, requestNumber: number): Promise<Response> => {
  const decodedToken = verifyAccessToken(accessToken);
  if (!decodedToken) {
    throw new Error("Can't find user from token");
  }

  const user = await getById(new ObjectId(decodedToken.id));
  if (!user) {
    throw new Error(`Can't find user by refresh token`);
  }

  return res.json({
    request_num: requestNumber,
    data: {
      username: user.email,
    },
  });
};
