import { Square } from 'chess.js';
import { Document, model, Model, Schema } from 'mongoose';

export interface Game {
  white: string;
  black: string;
  date: Date;
  type: string;
  result: string;
  moves: Move[];
}

export interface Move {
  fen: string;
  color?: 'white' | 'black';
  from?: Square;
  to?: Square;
  notation?: string;
}

interface MoveDocument extends Move, Document<number> {}
export interface GameDocument extends Game, Document<number> {}

interface MoveModel extends Model<MoveDocument> {}
interface GameModel extends Model<GameDocument> {}

const MoveSchema = new Schema<MoveDocument, MoveModel>({
  _id: Number,
  fen: String,
  color: String,
  from: String,
  to: String,
  notation: String,
});

const GameSchema = new Schema<GameDocument, GameModel>({
  _id: Number,
  white: String,
  black: String,
  date: Date,
  type: String,
  result: String,
  moves: [MoveSchema],
});
export default model<GameDocument, GameModel>('Game', GameSchema);
