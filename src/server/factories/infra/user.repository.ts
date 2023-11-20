import { PgRepository } from '@/infra/db/pg.repository';
import { UserRepository } from '@/infra/db/repositories/user.repository';

export const makePgUserRepo = (): PgRepository => {
  return new UserRepository();
};
