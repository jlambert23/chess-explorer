import { Router } from 'express';

import { getAscii, getNextMoves } from '../../services/explorer.service';

const explorerRouter = Router();

explorerRouter.post('/', async (req, res) => {
  const fen = req.body?.fen;
  const nextMoves = await getNextMoves(fen);
  const ascii = getAscii(fen);
  res.send({
    fen,
    ascii,
    nextMoves,
  });
});

export default explorerRouter;
