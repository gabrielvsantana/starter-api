import { RequestHandler } from 'express';

import { Controller } from '@/infra/http/controller';

type Adapter = (controller: Controller) => RequestHandler;

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle(req);
  const json = [200, 201, 204].includes(statusCode) ? data : { error: data.message };
  res.status(statusCode).json(json);
};
