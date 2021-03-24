import { Document, model, Model, Schema, SchemaTypes, Types } from 'mongoose';
import { Game, GameDocument } from './game.model';

export interface Player {
  playerName: string;
  games: Types.ObjectId[] | Game[];
}

export interface PlayerDocument extends Player, Document {
  games: GameDocument['_id'][];
}

export interface PlayerPopulatedDocument extends Player, Document {
  games: GameDocument[];
}

interface PlayerModel extends Model<PlayerDocument> {}

const PlayerSchema = new Schema<PlayerDocument, PlayerModel>({
  playerName: String,
  games: [{ type: SchemaTypes.ObjectId, ref: 'Game' }],
});
export default model<PlayerDocument, PlayerModel>('Player', PlayerSchema);
