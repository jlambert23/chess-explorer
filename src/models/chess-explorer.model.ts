import { Move } from '@mliebelt/pgn-parser';

export interface Meta {
  result: {
    white: number;
    black: number;
    draw: number;
  };
}

export interface MoveNode {
  children: MoveNode[];
  meta: Meta;
  value: Move;
}

export interface NotationNode {
  [value: string]: NotationNode[];
}
