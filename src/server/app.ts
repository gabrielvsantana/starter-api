import express from 'express';

import { NotFoundError } from '@/infra/http/http.errors';
import { logger } from '@/infra/logger';

import { setupMiddlewares } from './config/middlewares';
import { setupRoutes } from './config/routes';

logger.info('Server :: Booting');
const app = express();

logger.info('Middlewares :: Mounting API Middlewares...');
setupMiddlewares(app);

logger.info('Routes :: Mounting API Routes...');
setupRoutes(app);

logger.info('Routes :: Mounting "NotFound" Handler...');
app.all('*', () => {
  throw new NotFoundError();
});

export { app };
