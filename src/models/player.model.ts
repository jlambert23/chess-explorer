import { Document, model, Model, Schema } from 'mongoose';
import { Game, GameDocument } from './game.model';

export interface Player {
  playerName: string;
  games: number[] | Game[];
  lastUpdated: Date;
}

export interface PlayerDocument extends Player, Document {
  games: GameDocument['_id'][];
}

export interface PlayerPopulatedDocument extends Player, Document {
  games: GameDocument[];
}

interface PlayerModel extends Model<PlayerDocument> {}

const PlayerSchema = new Schema<PlayerDocument, PlayerModel>({
  playerName: { type: String, index: true, unique: true },
  games: [{ type: Number, ref: 'Game' }],
  lastUpdated: Date,
});
export default model<PlayerDocument, PlayerModel>('Player', PlayerSchema);
