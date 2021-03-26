import { ErrorRequestHandler, Express, urlencoded } from 'express';

import playerRouter from './player.routes';

export default function (app: Express) {
  app.use(urlencoded({ extended: true }));
  app.use('/player', playerRouter);
  app.use(errorHandler);
}

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  console.log('entered errorHandler');
  if (err) {
    console.log(err.stack);
    console.log(res);
    return res.send(500);
  }
  next(err);
};
