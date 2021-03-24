import { connect } from './controllers/_server';
import { getNextMoves } from './services/explorer.service';
import { loadPlayerGames } from './services/loader.service';

const player = 'justuntinian';
const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';

const reloadGames = true;

async function main() {
  try {
    await connect(reloadGames);

    if (reloadGames) {
      console.log('loading games...');
      await loadPlayerGames(player);
      console.log('finished');
    }

    console.log(`getting next moves for ${fen}`);
    const nextMoves = await getNextMoves(fen);
    console.log(nextMoves);
  } catch (e) {
    console.error(e);
  }
}

(async () => main())();
