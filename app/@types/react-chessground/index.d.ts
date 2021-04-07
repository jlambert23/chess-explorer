declare module 'react-chessground' {
  import React from 'react';

  export type Color = 'white' | 'black';
  export type Role = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
  export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  export type Key = '' | 'a0' | `${File}${Rank}`;
  export type FEN = string;
  export interface Piece {
    role: Role;
    color: Color;
    promoted?: booleanean;
  }

  export type Dests = Map<Key, Key[]>;

  export interface MoveMetadata {
    premove: booleanean;
    ctrlKey?: booleanean;
    holdTime?: number;
    captured?: Piece;
    predrop?: booleanean;
  }
  export interface SetPremoveMetadata {
    ctrlKey?: booleanean;
  }

  export interface DrawShape {
    orig: Key;
    dest?: Key;
    brush?: string;
    modifiers?: DrawModifiers;
    piece?: DrawShapePiece;
    customSvg?: string;
  }

  export interface DrawShapePiece {
    role: Role;
    color: Color;
    scale?: number;
  }

  export interface DrawBrush {
    key: string;
    color: string;
    opacity: number;
    lineWidth: number;
  }

  export interface DrawModifiers {
    lineWidth?: number;
  }

  export interface ChessgroundProps {
    width?: string | number;
    height?: string | number;
    fen?: FEN;
    orientation?: Color;
    turnColor?: Color;
    check?: Color | boolean;
    lastMove?: Key[];
    selected?: Key;
    coordinates?: boolean;
    autoCastle?: boolean;
    viewOnly?: boolean;
    disableContextMenu?: boolean;
    resizable?: boolean;
    addPieceZIndex?: boolean;
    highlight?: {
      lastMove?: boolean;
      check?: boolean;
    };
    animation?: {
      enabled?: boolean;
      duration?: number;
    };
    movable?: {
      free?: boolean;
      color?: Color | 'both';
      dests?: Dests;
      showDests?: boolean;
      events?: {
        after?: (orig: Key, dest: Key, metadata: MoveMetadata) => void;
        afterNewPiece?: (role: Role, key: Key, metadata: MoveMetadata) => void;
      };
      rookCastle?: boolean;
    };
    premovable?: {
      enabled?: boolean;
      showDests?: boolean;
      castle?: boolean;
      dests?: Key[];
      events?: {
        set?: (orig: Key, dest: Key, metadata?: SetPremoveMetadata) => void;
        unset?: () => void;
      };
    };
    predroppable?: {
      enabled?: boolean;
      events?: {
        set?: (role: Role, key: Key) => void;
        unset?: () => void;
      };
    };
    draggable?: {
      enabled?: boolean;
      distance?: number;
      autoDistance?: boolean;
      showGhost?: boolean;
      deleteOnDropOff?: boolean;
    };
    selectable?: {
      enabled?: boolean;
    };
    onChange?: () => void;
    onMove?: (orig: Key, dest: Key, capturedPiece?: Piece) => void;
    onDropNewPiece?: (piece: Piece, key: Key) => void;
    onSelect?: (key: Key) => void;
    // items?: Object;
    drawable?: {
      enabled?: boolean;
      visible?: boolean;
      defaultSnapToValidMove?: boolean;
      eraseOnClick?: boolean;
      shapes?: DrawShape[];
      autoShapes?: DrawShape[];
      brushes?: DrawBrush[];
      pieces?: {
        baseUrl?: string;
      };
      onChange?: (shapes: DrawShape[]) => void;
    };
  }

  class Chessground extends React.Component<ChessgroundProps> {}
  export default Chessground;
}
