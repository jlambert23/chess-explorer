import { Chess } from 'chess.js';

import { getGames, PgnHeaders } from '../apis/chess.com';
import GameModel, { GameDocument } from '../models/game.model';
import PlayerModel from '../models/player.model';

export async function loadGame(pgn: string) {
  const chessFullGame = new Chess();
  const chess = new Chess();
  chessFullGame.load_pgn(pgn, { sloppy: true });
  const headers = chessFullGame.header() as PgnHeaders;

  const splitUrl = headers.Link.split('/');
  const gameId = +splitUrl[splitUrl.length - 1];
  const gameType = splitUrl[splitUrl.length - 2];
  const endDate = new Date(
    `${chessFullGame.header().EndDate} ${chessFullGame.header().EndTime}`
  );

  return (
    (await GameModel.findOne({ _id: gameId })) ||
    (await GameModel.create({
      _id: gameId,
      white: chessFullGame.header().White,
      black: chessFullGame.header().Black,
      date: endDate,
      type: gameType,
      result: chessFullGame.header().Result,
      moves: chessFullGame.history().reduce(
        (acc, move) => {
          chess.move(move);
          acc.push({ fen: chess.fen(), notation: move });
          return acc;
        },
        [{ fen: chess.fen(), notation: '' }]
      ),
    }))
  );
}

export async function loadGames(pgns: string[]) {
  const games = [] as GameDocument[];
  for (const [i, pgn] of pgns.entries()) {
    console.log(`loaded game ${i + 1} out of ${pgns.length}`);
    games.push(await loadGame(pgn));
  }
  return games;
}

export async function loadPlayerGames(playerName: string) {
  const { games } = await getGames(playerName);
  const pgns = games.map((game) => game.pgn);
  const loadedGames = await loadGames(pgns);

  const player =
    (await PlayerModel.findOne({ playerName })) ||
    (await PlayerModel.create({ playerName }));

  player.lastUpdated = new Date();
  player.games = loadedGames.map(({ _id }) => _id);
  player.save();

  return player;
}
