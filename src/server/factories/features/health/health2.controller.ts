import { Health2Controller } from '@/features/health/health2.controller';
import { Controller } from '@/infra/http/controller';

export const makeHealth2Controller = (): Controller => {
  return new Health2Controller();
};
