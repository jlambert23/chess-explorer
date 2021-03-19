import { Document, model, Model, Schema } from 'mongoose';

export interface Game {
  white: string;
  black: string;
  date: Date;
  result: string;
  fens: string[];
}

export interface GameDocument extends Game, Document {}

interface GameModel extends Model<GameDocument> {}

const GameSchema = new Schema<GameDocument, GameModel>({
  white: String,
  black: String,
  date: Date,
  result: String,
  fens: [String],
});
export default model<GameDocument, GameModel>('Game', GameSchema);
