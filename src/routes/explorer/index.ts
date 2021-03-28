import { Router } from 'express';

import { validateExplorerBody } from './validators';
import {
  FenResult,
  getAscii,
  getNextMoves,
} from '../../services/explorer.service';

const explorerRouter = Router();

interface Explorer {
  fen: string;
  color: 'white' | 'black';
  source: 'all' | string;
  ascii?: string;
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

    const ascii = getAscii(fen);

    res.send({
      fen,
      color,
      ascii,
      nextMoves,
      source,
    });
  }
);

export default explorerRouter;
