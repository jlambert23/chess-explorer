import { Chess } from 'chess.js';

import { Move } from '../models/game.model';
import { aggregateMovesByFen } from '../controllers/game.controller';

export interface FenResult {
  move: Move;
  whiteWon: number;
  blackWon: number;
  draw: number;
}

export function getAscii(fen: string) {
  const chess = new Chess(fen);
  return chess.ascii();
}

export async function getNextMoves(fen: string) {
  const fenAggregates = await aggregateMovesByFen(fen);

  const fenMap = fenAggregates.reduce((acc, game) => {
    const move = game.moves[game.index + 1];
    if (move) {
      if (!acc.has(move.fen)) {
        acc.set(move.fen, { move, whiteWon: 0, blackWon: 0, draw: 0 });
      }
      if (game.result === '1-0') {
        acc.get(move.fen).whiteWon += 1;
      } else if (game.result === '0-1') {
        acc.get(move.fen).blackWon += 1;
      } else {
        acc.get(move.fen).draw += 1;
      }
    }
    return acc;
  }, new Map<string, FenResult>());

  return [...fenMap.values()].sort((a, b) => {
    const count = (x: FenResult) => x.blackWon + x.whiteWon + x.draw;
    return count(b) - count(a);
  });
}
