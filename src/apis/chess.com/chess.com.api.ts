import { get } from '../_https.api';
import {
  ChessArchives,
  ChessGames,
  ChessPlayer,
  ChessPlayerStats,
} from './chess.com.model';

const chessApiUrl = 'https://api.chess.com/pub/player';

export function getArchives(player: string): Promise<ChessArchives> {
  return get<ChessArchives>(`${chessApiUrl}/${player}/games/archives`);
}

export async function getGames(player: string, lastUpdated?: Date) {
  const dates = await getGameDates(player, lastUpdated);
  const chessGames: ChessGames = { games: [] };

  for (let { year, month } of dates) {
    const { games } = await getGamesByYearMonth(player, year, month);
    chessGames.games.push(...games);
  }

  return chessGames;
}

export async function getGamesAsPgns(player: string, lastUpdated?: Date) {
  const dates = await getGameDates(player, lastUpdated);
  const pgns: string[] = [];
  for (let { year, month } of dates) {
    pgns.push(await getGamesByYearMonthPgn(player, year, month));
  }
  return pgns.join('\n\n');
}

export async function getGamesByYearMonth(
  player: string,
  year: string,
  month: string
): Promise<ChessGames> {
  const games = await get<ChessGames>(
    `${chessApiUrl}/${player}/games/${year}/${month}`
  );

  games.games.forEach((game) => {
    const [gameType, id] = game.url.split('/').slice(-2);
    game._id = +id;
    game._gameType = gameType;
  });

  return games;
}

export function getGamesByYearMonthPgn(
  player: string,
  year: string,
  month: string
) {
  return get<string>(`${chessApiUrl}/${player}/games/${year}/${month}/pgn`);
}

export function getPlayer(player: string) {
  return get<ChessPlayer>(`${chessApiUrl}/${player}`);
}

export function getPlayerStats(player: string) {
  return get<ChessPlayerStats>(`${chessApiUrl}/${player}/stats`);
}

async function getGameDates(player: string, lastUpdated?: Date) {
  const archives = await getArchives(player);

  let dates =
    archives?.archives.map((archive) => {
      const split = archive.split('/');
      const year = split[split.length - 2];
      const month = split[split.length - 1];
      return { year, month };
    }) || [];

  if (lastUpdated) {
    lastUpdated.setDate(0);
    dates = dates.filter(
      ({ year, month }) => new Date(`${month}/01/${year}`) > lastUpdated
    );
    console.log(dates);
  }

  console.log(`${player} has ${dates.length} dates`);
  return dates;
}
