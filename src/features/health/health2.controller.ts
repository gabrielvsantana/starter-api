import { Controller } from '@/infra/http/controller';
import { HttpResponse, ok } from '@/infra/http/http.helpers';

type Model = Error | Date;

export class Health2Controller extends Controller {
  constructor() {
    super();
  }

  async perform(): Promise<HttpResponse<Model>> {
    return ok(new Date());
  }
}
