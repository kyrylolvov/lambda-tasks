import { Request, Response } from 'express';
import { getService, postService } from '../services/json.js';

export const post = async (req: Request, res: Response) => {
  try {
    const { route } = req.params;

    const { body } = req;
    if (JSON.stringify(body) == '{}') {
      return res.status(400).json({ message: 'Please, provide a valid JSON' });
    }

    const response = await postService(res, route, body);

    return response.status(200).json({ message: 'Your JSON was successfully added!' });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message ?? 'Something went wrong' });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { route } = req.params;

    const response = await getService(res, route);

    return response.status(200);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message ?? 'Something went wrong' });
  }
};
