import * as mongoose from 'mongoose';

export interface IMove {
  notation: string;
  moveNumber: number;
  player: string;
  color: 'white' | 'black';
  result: {
    whiteWon: number;
    blackWon: number;
    draw: number;
  };
}
interface MoveDocument extends IMove, mongoose.Document {}
interface MoveModel extends mongoose.Model<MoveDocument> {}

export const MoveSchema = new mongoose.Schema({
  notation: String,
  moveNumber: Number,
  player: String,
  color: String,
  result: {
    whiteWon: Number,
    blackWon: Number,
    draw: Number,
  },
});
export default mongoose.model<MoveDocument, MoveModel>('Move', MoveSchema);
