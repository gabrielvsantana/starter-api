import { ForbiddenError, ServerError, UnauthorizedError } from './http.errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const ok = <T = unknown>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const created = <T = unknown>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
});

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError(),
});

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError(),
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});
