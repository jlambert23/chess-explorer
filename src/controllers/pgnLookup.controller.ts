import PgnLookup from '../models/data/PgnLookup.model';

export async function createPgnLookup(pgn: string) {
  return PgnLookup.create({ pgn, moves: [] });
}

export async function getPgnLookup(pgn: string) {
  return PgnLookup.findOne({ pgn }).exec();
}
