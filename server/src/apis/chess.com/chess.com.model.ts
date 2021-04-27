export interface ChessArchives {
  archives: string[];
}

export interface ChessGames {
  games: ChessGame[];
}

export interface ChessGame {
  _id?: number; // extracted from url
  _gameType?: string; //extracted from url
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

export interface ChessPlayer {
  avatar: string;
  player_id: string;
  '@id': string;
  url: string;
  name?: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
}

export interface ChessPlayerStats {
  chess_daily?: GameStats;
  chess960_daily?: GameStats;
  chess_rapid?: GameStats;
  chess_bullet?: GameStats;
  chess_blitz?: GameStats;
  fide: number;
  tactics: {} | LessonTacticStats;
  lessons: {} | LessonTacticStats;
  puzzle_rush: {} | PuzzleRushStats;
}

export interface GameStats {
  last: {
    rating: number;
    date: number;
    rd: number;
  };
  best: {
    rating: number;
    date: number;
    game: string; // url to best game
  };
  record: {
    win: number;
    loss: number;
    draw: number;
    time_per_move?: number; // correspondence
    timeout_percent?: number; // correspondence
  };
}

export interface LessonTacticStats {
  highest: {
    rating: number;
    date: number;
  };
  lowest: {
    rating: number;
    date: number;
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

export interface PuzzleRushStats {
  best: {
    totalAttempts: number;
    score: number;
  };
  daily: {
    totalAttempts: number;
    score: number;
  };
}
