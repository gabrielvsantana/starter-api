import { PgUser } from '@/infra/db/entities/user.entity';
import { PgRepository } from '@/infra/db/pg.repository';
import { Controller } from '@/infra/http/controller';
import { HttpResponse, created } from '@/infra/http/http.helpers';

import { User } from '../.models/user.model';

type HttpRequest = { body: Record<string, unknown> };
type Model = Error | User;

export class CreateUserController extends Controller {
  constructor(private readonly pgRepo: PgRepository) {
    super();
  }

  async perform(req: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.pgRepo.getRepository(PgUser).save(req.body);
    const userDto = Object.assign(new User(), user);
    return created(userDto);
  }
}
