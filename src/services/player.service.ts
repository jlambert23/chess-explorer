import {
  ChessPlayerStats,
  GameStats,
  getPlayer,
  getPlayerStats,
} from '../apis/chess.com';
import { findPlayer } from '../controllers/player.controller';

interface PlayerData {
  _id?: string;
  playerName: string;
  country: string;
  rating: { [gameType: string]: number };
  games: {
    count: number;
    new?: number;
  };
  lastUpdated?: Date;
}

export async function getPlayerData(playerName: string): Promise<PlayerData> {
  const loadedPlayer = await findPlayer(playerName);
  const chessPlayer = await getPlayer(playerName);
  const chessPlayerStats = await getPlayerStats(playerName);

  return {
    _id: loadedPlayer?._id,
    playerName: chessPlayer.username,
    country: chessPlayer.country?.split('/').pop(),
    rating: getRating(chessPlayerStats),
    games: {
      count: loadedPlayer?.games.length || 0,
    },
    lastUpdated: loadedPlayer?.lastUpdated,
  };
}

function getRating(stats: ChessPlayerStats) {
  return [
    'chess_daily',
    'chess960_daily',
    'chess_rapid',
    'chess_bullet',
    'chess_blitz',
  ].reduce((rating, gameType) => {
    const gameStat = stats[gameType] as GameStats;
    if (gameStat) {
      rating[gameType] = gameStat.last.rating;
    }
    return rating;
  }, {} as { [gameType: string]: number });
}
