import { Repository } from 'typeorm';

import { PgUser } from '../entities/user.entity';
import { PgRepository } from '../pg.repository';

/**
 * WIP
 */
export class UserRepository extends PgRepository {
  getRepo(): Repository<PgUser> {
    return super.getRepository(PgUser);
  }
}
