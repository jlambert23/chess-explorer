import { ErrorRequestHandler, Express } from 'express';
import 'express-async-errors';

import explorerRouter from './explorer';
import playerRouter from './player';

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  console.log('reached errorHandler');
  const { status, message } = extractError(err);
  return res.status(status).send(message);
};

const extractError = (err: any) => {
  let status = 500;
  let message = err;
  if (typeof err === 'object') {
    status = err?.response?.status || status;
    message = err?.response?.data || stringifyError(message);
  }
  return { status, message };
};

const stringifyError = function (err: any) {
  const plainObject = {};
  Object.getOwnPropertyNames(err).forEach(
    (key) => (plainObject[key] = err[key])
  );
  return JSON.stringify(plainObject);
};

export default function (app: Express) {
  app.use('/explorer', explorerRouter);
  app.use('/player', playerRouter);
  app.use(errorHandler);
}
