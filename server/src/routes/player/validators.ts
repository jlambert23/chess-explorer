import { RequestHandler } from 'express';

import { getPlayer } from '../../apis/chess.com';
import { playerExists } from '../../controllers/player.controller';

export const validateCreate: RequestHandler = async (req, res, next) => {
  const playerName = req.body?.playerName;
  if (!playerName) {
    return res.status(400).send('playerName required in request body.\n');
  }
  if (!(await getPlayer(playerName))) {
    return res.status(404).send(`Unable to find player ${playerName}.\n`);
  }
  return next();
};

export const validatePlayerParam: RequestHandler = async (req, res, next) => {
  const playerName = req.params.playerName;
  if (!(await playerExists(playerName))) {
    const message = `Unable to find player ${playerName}. Ensure they have been created.`;
    return res.status(404).send(message);
  }
  next();
};
