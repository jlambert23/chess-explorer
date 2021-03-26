import { Router } from 'express';

import {
  FenResult,
  getAscii,
  getNextMoves,
} from '../../services/explorer.service';

const explorerRouter = Router();

interface Explorer {
  fen: string;
  ascii?: string;
  nextMoves?: FenResult[];
}

explorerRouter.post<{}, Explorer, Explorer>('/', async (req, res) => {
  const { fen } = req.body;
  const nextMoves = await getNextMoves(fen);
  const ascii = getAscii(fen);
  res.send({
    fen,
    ascii,
    nextMoves,
  });
});

export default explorerRouter;
