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
  notation: string;
}

export interface GameDocument extends Game, Document<number> {}

interface GameModel extends Model<GameDocument> {}

const GameSchema = new Schema<GameDocument, GameModel>({
  _id: Number,
  white: String,
  black: String,
  date: Date,
  type: String,
  result: String,
  moves: [{ fen: String, notation: String }],
});
export default model<GameDocument, GameModel>('Game', GameSchema);
