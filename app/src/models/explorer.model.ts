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
  move: { _id: string; notation: string; fen: string };
}
