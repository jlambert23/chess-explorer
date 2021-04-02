export interface ExplorerData {
  ascii?: string;
  color: 'white' | 'black';
  fen: string;
  nextMoves?: Move[];
  source: 'all' | string;
}

export interface Move {
  blackWon: number;
  whiteWon: number;
  draw: number;
  move: { _id: string; notation: string; fen: string };
}
