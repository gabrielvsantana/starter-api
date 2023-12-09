import 'dotenv/config';
import './server/config/module-alias';

import { PgConnection } from '@/infra/db/pg.connection';
import { logger } from '@/infra/logger';
import { app } from '@/server/app';
import { env } from '@/server/config/env';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const main = async (): Promise<void> => {
  app.listen(env.port, () => logger.info(`Server running at http://localhost:${env.port}`));

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  exitSignals.forEach((exitSignal) => {
    process.on(exitSignal, async () => {
      try {
        await PgConnection.getInstance().disconnect();
        logger.info('App exited with success');
        process.exit(ExitStatus.Success);
      } catch (error) {
        logger.error(`App exited with error: ${error}`);
        process.exit(ExitStatus.Failure);
      }
    });
  });
};

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

PgConnection.getInstance()
  .connect()
  .then(() => main())
  .catch((err) => {
    logger.error('App exited with error:', err);
    process.exit(ExitStatus.Failure);
  });
