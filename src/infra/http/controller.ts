import { logger } from '@/infra/logger';

import { HttpResponse, badRequest, serverError } from './http.helpers';

export interface Validator {
  validate: () => Error | undefined;
}

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate();
      if (error !== undefined) return error;
    }
  }
}

export abstract class Controller {
  abstract perform(httpRequest: unknown): Promise<HttpResponse>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildValidators(httpRequest: unknown): Validator[] {
    return [];
  }

  async handle(httpRequest: unknown): Promise<HttpResponse> {
    const error = this.validate(httpRequest);
    if (error !== undefined) return badRequest(error);
    try {
      return await this.perform(httpRequest);
    } catch (error) {
      logger.error(`${error}`);
      return serverError(error);
    }
  }

  private validate(httpRequest: unknown): Error | undefined {
    const validators = this.buildValidators(httpRequest);
    return new ValidationComposite(validators).validate();
  }
}
