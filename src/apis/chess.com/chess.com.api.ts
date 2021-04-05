import { get } from '../_https.api';
import { ChessArchives, ChessGames, ChessPlayer } from './chess.com.model';

const chessApiUrl = 'https://api.chess.com/pub/player';

export function getArchives(player: string): Promise<ChessArchives> {
  return get<ChessArchives>(`${chessApiUrl}/${player}/games/archives`);
}

export async function getGames(player: string, lastUpdated?: Date) {
  const dates = await getGameDates(player, lastUpdated);

  const chessGame = dates.reduce(async (acc, { year, month }) => {
    const accumulator = await acc;
    const { games } = await getGamesByYearMonth(player, year, month);
    accumulator.games = [...accumulator.games, ...games];
    return Promise.resolve(accumulator);
  }, Promise.resolve({ games: [] } as ChessGames));

  return chessGame;
}

export async function getGamesAsPgns(player: string) {
  const dates = await getGameDates(player);

  const pgns = dates.reduce(async (acc, { year, month }, i) => {
    const accumulator = await acc;
    const pgns = await getGamesByYearMonthPgn(player, year, month);
    const newlines = i ? '\n\n' : '';
    return Promise.resolve(accumulator + newlines + pgns);
  }, Promise.resolve(''));

  return pgns;
}

export function getGamesByYearMonth(
  player: string,
  year: string,
  month: string
) {
  return get<ChessGames>(`${chessApiUrl}/${player}/games/${year}/${month}`);
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

async function getGameDates(player: string, lastUpdated?: Date) {
  const { archives } = (await getArchives(player)) || { archives: [] };

  let dates = archives.map((archive) => {
    const split = archive.split('/');
    const year = split[split.length - 2];
    const month = split[split.length - 1];
    return { year, month };
  });

  if (lastUpdated) {
    lastUpdated.setDate(0);
    dates = dates.filter(
      ({ year, month }) => new Date(`${month}/01/${year}`) > lastUpdated
    );
    console.log(dates);
  }

  return dates;
}
