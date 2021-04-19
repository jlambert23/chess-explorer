export interface Player {
  _id: string;
  playerName: string;
}

export interface PlayerInfo extends Player {
  country: string;
  rating: { [gameType: string]: number };
  games: number;
  lastUpdated?: Date;
}
