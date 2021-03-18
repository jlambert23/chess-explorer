import * as mongoose from 'mongoose';
import { IMove, MoveSchema } from './Move.model';

export interface IPgnLookup {
  pgn: string;
  moves: IMove[];
}
interface PgnLookupDocument extends IPgnLookup, mongoose.Document {}
interface PgnLookupModel extends mongoose.Model<PgnLookupDocument> {}

mongoose.SchemaTypes.String.checkRequired((v) => v != null);

const PgnLookupSchema = new mongoose.Schema({
  pgn: { type: String, required: true, unique: true },
  moves: [MoveSchema],
});
export default mongoose.model<PgnLookupDocument, PgnLookupModel>(
  'PgnLookup',
  PgnLookupSchema
);
