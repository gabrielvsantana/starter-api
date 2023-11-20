import { HealthController } from '@/features/health/health.controller';
import { Controller } from '@/infra/http/controller';

export const makeHealthController = (): Controller => {
  return new HealthController();
};
