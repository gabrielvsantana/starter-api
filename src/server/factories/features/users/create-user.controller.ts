import { CreateUserController } from '@/features/users/create-user.controller';
import { Controller } from '@/infra/http/controller';
import { makePgUserRepo } from '@/server/factories/infra/user.repository';

export const makeCreateUserController = (): Controller => {
  return new CreateUserController(makePgUserRepo());
};
