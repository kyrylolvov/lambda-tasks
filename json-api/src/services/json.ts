import { Response } from 'express';
import { create, getByRoute } from '../database/json.js';

import { JSON } from '../types/json.js';

export const postService = async (res: Response, route: string, json: JSON): Promise<Response> => {
  const isExistByRoute: boolean = Boolean(await getByRoute(route));
  if (isExistByRoute) {
    throw new Error('There is already a json with the specified route');
  }

  await create({ route, json });

  return res;
};

export const getService = async (res: Response, route: string): Promise<Response> => {
  const existingRoute = await getByRoute(route);
  if (!Boolean(existingRoute)) {
    throw new Error('There is no json with the specified route');
  }

  const json = Array.isArray(existingRoute?.json) ? existingRoute?.json : { ...existingRoute?.json };

  return res.json(json);
};
