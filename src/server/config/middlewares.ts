import cors from 'cors';
import { Express, json } from 'express';

import { logger } from '@/infra/logger';

export const setupMiddlewares = (app: Express): void => {
  logger.info('Middlewares :: Mounting "CORS"...');
  app.use(cors());

  logger.info('Middlewares :: Mounting "Body-Parser"...');
  app.use(json());

  logger.info('Middlewares :: Mounting "Content-Type"...');
  app.use((req, res, next) => {
    res.type('json');
    next();
  });
};
