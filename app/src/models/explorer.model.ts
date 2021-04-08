import { Key } from 'react-chessground';

export interface ExplorerData {
  color: 'white' | 'black';
  fen: 'start' | string;
  nextMoves?: Move[];
  source: 'all' | string;
}

export interface Move {
  blackWon: number;
  whiteWon: number;
  draw: number;
  move: MoveDetails;
}

interface MoveDetails {
  _id: number;
  fen: string;
  color?: 'white' | 'black';
  from?: Key;
  to?: Key;
  notation?: string;
}
