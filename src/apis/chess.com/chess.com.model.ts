export interface ChessArchives {
  archives: string[];
}

export interface ChessGames {
  games: ChessGame[];
}

export interface ChessGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    '@id': string;
    username: string;
  };
  black: {
    rating: number;
    result: string;
    '@id': string;
    username: string;
  };
}

export interface PgnHeaders {
  Event?: string;
  Site?: string;
  Date?: string;
  Round?: string;
  White?: string;
  Black?: string;
  Result?: string;
  CurrentPosition?: string;
  Timezone?: string;
  ECO?: string;
  ECOUrl?: string;
  UTCDate?: string;
  UTCTime?: string;
  WhiteElo?: string;
  BlackElo?: string;
  TimeControl?: string;
  Termination?: string;
  StartTime?: string;
  EndDate?: string;
  EndTime?: string;
  Link?: string;
}
