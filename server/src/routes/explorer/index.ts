import { Router } from 'express';

import { validateExplorerBody } from './validators';
import { FenResult, getNextMoves } from '../../services/explorer.service';

const explorerRouter = Router();

interface Explorer {
  fen: 'start' | string;
  color: 'white' | 'black';
  source: 'all' | string;
  nextMoves?: FenResult[];
}

explorerRouter.post<{}, Explorer, Explorer>(
  '/',
  validateExplorerBody,
  async (req, res) => {
    const { fen, color, source } = req.body;

    const nextMoves =
      source === 'all'
        ? await getNextMoves(fen)
        : await getNextMoves(fen, { playerName: source, color });

    res.send({
      fen,
      color,
      nextMoves,
      source,
    });
  }
);

export default explorerRouter;
