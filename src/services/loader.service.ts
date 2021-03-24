import { Chess } from 'chess.js';

import { getGames } from '../apis/chess.com/chess.com.api';
import GameModel, { Game, GameDocument } from '../models/game.model';
import PlayerModel from '../models/player.model';

export async function loadGame(pgn: string) {
  const chessFullGame = new Chess();
  const chess = new Chess();
  chessFullGame.load_pgn(pgn, { sloppy: true });

  const endDate = new Date(
    `${chessFullGame.header().EndDate} ${chessFullGame.header().EndTime}`
  );
  const newGame = {
    white: chessFullGame.header().White,
    black: chessFullGame.header().Black,
    date: endDate,
    result: chessFullGame.header().Result,
    fens: chessFullGame.history().reduce(
      (acc, move) => {
        chess.move(move);
        acc.push(chess.fen());
        return acc;
      },
      [chess.fen()]
    ),
  } as Game;

  return (
    (await GameModel.findOne({
      white: newGame.white,
      black: newGame.black,
      date: newGame.date,
      result: newGame.result,
    })) || (await GameModel.create(newGame))
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

  const player =
    (await PlayerModel.findOne({ playerName })) ||
    (await PlayerModel.create({ playerName }));

  player.games = await loadGames(pgns);
  player.save();

  return player;
}
