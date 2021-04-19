import { Router } from 'express';

import { validateCreate, validatePlayerParam } from './validators';
import { findPlayerNames } from '../../controllers/player.controller';
import { loadPlayerGames } from '../../services/loader.service';
import { getPlayerData } from '../../services/player.service';

const playerRouter = Router();

playerRouter
  .route('/')
  .get(async (_, res) => {
    const players = await findPlayerNames();
    res.send(players);
  })
  .post(validateCreate, async (req, res) => {
    const playerName = req.body?.playerName;
    await loadPlayerGames(playerName);
    const player = await getPlayerData(playerName);
    res.send(player);
  });

playerRouter.route('/:playerName').get(async (req, res) => {
  const playerName = req.params.playerName;
  const player = await getPlayerData(playerName);
  res.send(player);
});

playerRouter.use('/:playerName/refresh', validatePlayerParam);
playerRouter.route('/:playerName/refresh').post(async (req, res) => {
  const playerName = req.params.playerName;
  const player = await loadPlayerGames(playerName);
  res.send(player);
});

export default playerRouter;
