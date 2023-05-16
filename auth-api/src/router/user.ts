import { Router } from 'express';

import { getMe } from '../controllers/user.js';

export default (router: Router) => {
  router.get(/\/me[0-9]/, getMe);
};
