import { Router } from 'express';

import { adaptExpressRoute as adapt } from '@/server/adapters/express-router';
import { makeHealthController } from '@/server/factories/features/health/health.controller';
import { makeHealth2Controller } from '@/server/factories/features/health/health2.controller';

export default (router: Router): void => {
  router.get('/health', adapt(makeHealthController()));
  router.get('/health/:id', adapt(makeHealth2Controller()));
  router.get('/health/:id/cool', adapt(makeHealth2Controller()));
};
