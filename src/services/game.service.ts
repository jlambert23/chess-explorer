import { Game, Move } from '@mliebelt/pgn-parser';
import { addMove } from '../controllers/move.controller';

export async function loadGames(games: Game[], options?: { padding: number }) {
  for (const [i, game] of games.entries()) {
    console.log(`loaded game ${i + 1} out of ${games.length}`);
    await loadGame(game, options);
  }
}

export async function loadGame(game: Game, options = { padding: 0 }) {
  const sortedMoves = getSortedMoves(game);
  let pgn = '';

  for (const [i, move] of sortedMoves.entries()) {
    await addMove(pgn, {
      notation: move.notation.notation,
      moveNumber: move.moveNumber,
      color: move.turn === 'w' ? 'white' : 'black',
      player: move.turn === 'w' ? game.tags.White : game.tags.Black,
      result: parseResult(game.tags.Result),
    });
    pgn += appendPgnKey(move, i, options.padding);
  }
}

function appendPgnKey(move: Move, i: number, padding: number) {
  const pad = ' '.repeat(padding);
  const moveNumber = move.turn === 'w' ? `${move.moveNumber}.${pad}` : '';
  const notation = move.notation.notation.trim();
  return (i ? pad : '') + moveNumber + notation;
}

function getSortedMoves(game: Game) {
  const moves = game.moves.slice(0, game.moves.length - 1) as Move[];
  moves.sort((a, b) => {
    let res = a.moveNumber - b.moveNumber;
    if (res === 0) {
      res = a.turn === 'w' ? -1 : 1;
    }
    return res;
  });
  return moves;
}

function parseResult(result: string) {
  const retval = { whiteWon: 0, blackWon: 0, draw: 0 };
  if (result === '1-0') {
    retval.whiteWon += 1;
  } else if (result === '0-1') {
    retval.blackWon += 1;
  } else {
    retval.draw += 1;
  }
  return retval;
}
