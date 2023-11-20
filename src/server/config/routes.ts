import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

import { logger } from '@/infra/logger';

export const setupRoutes = (app: Express): void => {
  const router = Router();

  readdirSync(join(__dirname, '../routes'))
    .filter((file) => !file.endsWith('.map'))
    .map(async (file) => {
      try {
        logger.info(`Routes :: Mounting "${file}" route`);
        (await import(`../routes/${file}`)).default(router);
      } catch (error) {
        throw new Error(`Error while mounting "${file}" route: ${error}`);
      }
    });

  app.use('/api', router);
};
