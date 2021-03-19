import { connect } from './controllers/_server';
import { loadPlayerGames } from './services/loader.service';

const player = 'justuntinian';

async function main() {
  try {
    await connect(true);

    console.log('loading games...');
    await loadPlayerGames(player);
    console.log('finished');
  } catch (e) {
    console.error(e);
  }
}

(async () => main())();
