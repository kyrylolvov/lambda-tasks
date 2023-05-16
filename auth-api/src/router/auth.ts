import { Router } from 'express';
import { login, refresh, signUp } from '../controllers/auth.js';

export default (router: Router) => {
  router.post('/sign_up', signUp);
  router.post('/login', login);
  router.post('/refresh', refresh);
};
