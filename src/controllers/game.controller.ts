import GameModel, { Move } from '../models/game.model';

export interface MoveAggregate {
  moves: Move[];
  index: number;
  result: string;
}

export function aggregateMovesByFen(fen: string) {
  return GameModel.aggregate<MoveAggregate>([
    {
      $match: { 'moves.fen': fen },
    },
    {
      $project: {
        moves: '$moves',
        result: '$result',
        index: {
          $indexOfArray: ['$moves.fen', fen],
        },
      },
    },
  ]);
}
