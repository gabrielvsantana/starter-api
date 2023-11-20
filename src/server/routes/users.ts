import { Router } from 'express';

import { adaptExpressRoute as adapt } from '@/server/adapters/express-router';
import { makeCreateUserController } from '@/server/factories/features/users/create-user.controller';

export default (router: Router): void => {
  router.post('/users', adapt(makeCreateUserController()));
};
