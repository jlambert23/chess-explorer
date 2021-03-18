import { IMove } from '../models/data/Move.model';
import { createPgnLookup, getPgnLookup } from './pgnLookup.controller';

export async function addMove(pgn: string, move: IMove) {
  const pgnLookup = (await getPgnLookup(pgn)) || (await createPgnLookup(pgn));
  const foundMove = pgnLookup.moves.find((m) => m.notation === move.notation);
  if (foundMove) {
    foundMove.result = {
      whiteWon: foundMove.result.whiteWon + move.result.whiteWon,
      blackWon: foundMove.result.blackWon + move.result.blackWon,
      draw: foundMove.result.draw + move.result.draw,
    };
  } else {
    pgnLookup.moves.push(move);
  }
  pgnLookup.save();
  return foundMove || move;
}
