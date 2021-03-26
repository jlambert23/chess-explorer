import { Chess } from 'chess.js';
import GameModel from '../models/game.model';

type FenDict = {
  [fen: string]: { whiteWon: number; blackWon: number; draw: number };
};

interface FenAggregate {
  fens: string[];
  index: number;
  result: string;
}

interface FenResult {
  fen: string;
  whiteWon: number;
  blackWon: number;
  draw: number;
}

export function getAscii(fen: string) {
  const chess = new Chess(fen);
  return chess.ascii();
}

export async function getNextMoves(fen: string) {
  const fenIndeces = await aggregateFens(fen);
  const nextFenDict = getNextFenDict(fenIndeces);
  return flattenFenDict(nextFenDict);
}

function aggregateFens(fen: string) {
  return GameModel.aggregate<FenAggregate>([
    {
      $match: { fens: fen },
    },
    {
      $project: {
        fens: '$fens',
        result: '$result',
        index: {
          $indexOfArray: ['$fens', fen],
        },
      },
    },
  ]);
}

function getNextFenDict(fenAggregates: FenAggregate[]) {
  return fenAggregates.reduce((acc, game) => {
    const nextFen = game.fens[game.index + 1];

    if (nextFen) {
      if (!acc[nextFen]) {
        acc[nextFen] = { whiteWon: 0, blackWon: 0, draw: 0 };
      }

      if (game.result === '1-0') {
        acc[nextFen].whiteWon += 1;
      } else if (game.result === '0-1') {
        acc[nextFen].blackWon += 1;
      } else {
        acc[nextFen].draw += 1;
      }
    }

    return acc;
  }, {} as FenDict);
}

function flattenFenDict(fenDict: FenDict) {
  return Object.entries(fenDict).map<FenResult>(
    ([fen, { whiteWon, blackWon, draw }]) => ({
      fen,
      whiteWon,
      blackWon,
      draw,
    })
  );
}
