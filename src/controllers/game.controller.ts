import GameModel, { Move } from '../models/game.model';

export interface MoveAggregate {
  moves: Move[];
  index: number;
  result: string;
}

export function aggregateMovesByFen(
  fen: string,
  filter?: { playerName: string; color: 'white' | 'black' }
) {
  const _filter = filter ? { [filter.color]: filter.playerName } : {};
  return GameModel.aggregate<MoveAggregate>([
    {
      $match: { 'moves.fen': fen, ..._filter },
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
