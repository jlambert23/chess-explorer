import { Router, RequestHandler } from 'express';

import { getPlayer } from '../apis/chess.com';
import { findPlayer, findPlayerNames } from '../controllers/player.controller';
import { loadPlayerGames } from '../services/loader.service';
import { playerExists } from './../controllers/player.controller';

const playerRouter = Router();

const validateCreate: RequestHandler = async (req, res, next) => {
  const playerName = req.body?.playerName;
  if (!playerName) {
    return res.status(400).send('playerName required in request body.\n');
  }
  if (await playerExists(playerName)) {
    const message = `Player ${playerName} already exists. Call player/${playerName}/refresh-games to update games.\n`;
    return res.status(400).send(message);
  }
  if (!(await getPlayer(playerName))) {
    return res.status(404).send(`Unable to find player ${playerName}.\n`);
  }
  return next();
};

const validatePlayerParam: RequestHandler = async (req, res, next) => {
  const playerName = req.params.playerName;
  if (!(await playerExists(playerName))) {
    const message = `Unable to find player ${playerName}. Ensure they have been created.`;
    return res.status(404).send(message);
  }
  next();
};

playerRouter
  .route('/')
  .get(async (_, res) => {
    const players = await findPlayerNames();
    res.send(players);
  })
  .post(validateCreate)
  .post(async (req, res) => {
    const playerName = req.body?.playerName;
    const player = await loadPlayerGames(playerName);
    res.send(player);
  });

playerRouter.use('/:playerName', validatePlayerParam);
playerRouter.route('/:playerName').get(async (req, res) => {
  const playerName = req.params.playerName;
  const player = await findPlayer(playerName);
  res.send(player);
});

export default playerRouter;
