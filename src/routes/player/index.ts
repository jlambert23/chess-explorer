import { Router } from 'express';

import { validateCreate, validatePlayerParam } from './validators';
import {
  findPlayer,
  findPlayerNames,
} from '../../controllers/player.controller';
import { loadPlayerGames } from '../../services/loader.service';

const playerRouter = Router();

playerRouter
  .route('/')
  .get(async (_, res) => {
    const players = await findPlayerNames();
    res.send(players);
  })
  .post(validateCreate, async (req, res) => {
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
