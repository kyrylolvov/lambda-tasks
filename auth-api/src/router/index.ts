import { Router } from 'express';

import auth from './auth.js';
import user from './user.js';

const router = Router();

export default (): Router => {
  auth(router);
  user(router);

  return router;
};
