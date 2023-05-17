import { Router } from 'express';
import { get, post } from '../controllers/json.js';

const router = Router();

const json = (router: Router) => {
  router.get('/:route', get);
  router.post('/:route', post);
};

export default (): Router => {
  json(router);

  return router;
};
