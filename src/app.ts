import { parse } from '@mliebelt/pgn-parser';

import { connect } from './controllers/_server';
import { getGamesAsPgns } from './apis/chess-com.api';
import { loadGames } from './services/game.service';

const player = 'justuntinian';

async function main() {
  try {
    await connect(true);
    const pgns = await getGamesAsPgns(player);
    const games = parse(pgns, { startRule: 'games' });
    console.log('loading games...');
    await loadGames(games);
    console.log('finished loading games');
  } catch (e) {
    console.error(e);
  }
}

(async () => main())();
