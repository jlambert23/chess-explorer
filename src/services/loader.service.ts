import { Chess, ChessInstance } from 'chess.js';

import { getGames, PgnHeaders } from '../apis/chess.com';
import GameModel, { GameDocument, Move } from '../models/game.model';
import PlayerModel from '../models/player.model';

export async function loadGame(pgn: string) {
  const chessFullGame = new Chess();
  chessFullGame.load_pgn(pgn, { sloppy: true });

  const headers = chessFullGame.header() as PgnHeaders;
  const splitUrl = headers.Link.split('/');
  const [gameType, gameId] = splitUrl.slice(-2);
  const _id = +gameId;

  return (
    (await GameModel.findOne({ _id })) ||
    (await GameModel.create({
      _id,
      gameType,
      ...newGame(chessFullGame, headers),
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
  const player =
    (await PlayerModel.findOne({ playerName })) ||
    (await PlayerModel.create({ playerName }));

  const { games } = await getGames(playerName, player.lastUpdated);
  const pgns = games.map((game) => game.pgn);
  const loadedGames = await loadGames(pgns);

  player.lastUpdated = new Date();
  player.games = loadedGames.map(({ _id }) => _id);
  player.save();

  return player;
}

function newGame(chessFullGame: ChessInstance, headers: PgnHeaders) {
  const chess = new Chess();
  const endDate = new Date(`${headers.EndDate} ${headers.EndTime}`);

  const moves = chessFullGame.history({ verbose: true }).reduce<Move[]>(
    (moves: Move[], { color, to, from, san }) => {
      chess.move(san);
      moves.push({
        fen: chess.fen(),
        color: color === 'w' ? 'white' : 'black',
        notation: san,
        to,
        from,
      });
      return moves;
    },
    [{ fen: chess.fen() }]
  );

  return {
    white: headers.White,
    black: headers.Black,
    result: headers.Result,
    date: endDate,
    moves,
  };
}
