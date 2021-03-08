import * as parser from '@mliebelt/pgn-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { ChessExplorerTrie } from './services/chess-explorer-trie';
import { getGamesAsPgns } from './apis/chess-com.api';

const player = 'justuntinian';
const dumpDir = `out/${player}`;

function createExplorers(games: parser.Game[]) {
  const whiteGames = games.filter(
    ({ tags }) => tags.White.toLowerCase() === player.toLowerCase()
  );
  console.log(`found ${whiteGames.length} white games`);

  const blackGames = games.filter(
    ({ tags }) => tags.Black.toLowerCase() === player.toLowerCase()
  );
  console.log(`found ${blackGames.length} black games`);

  const whiteExplorer = new ChessExplorerTrie(whiteGames);
  const blackExplorer = new ChessExplorerTrie(blackGames);

  dumpExplorer(`${dumpDir}/white`, whiteExplorer);
  dumpExplorer(`${dumpDir}/black`, blackExplorer);
}

function dumpExplorer(rootPath: string, explorer: ChessExplorerTrie) {
  dumpToFile(`${rootPath}/root.json`, JSON.stringify(explorer.root, null, 2));
  dumpToFile(`${rootPath}/notation.yaml`, yaml.dump(explorer.toNotation()));
}

function dumpToFile(path: string, data: any) {
  const folders = path.split('/');
  const folderPath = folders.slice(0, folders.length - 1).join('/');
  fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(path, data);
  console.log(`updated ${path}`);
}

async function main() {
  try {
    const pgns = await getGamesAsPgns(player);
    dumpToFile(`${dumpDir}/pgns.json`, pgns);
    const games = parser.parse(pgns, { startRule: 'games' });
    createExplorers(games);
  } catch (e) {
    console.error(e);
  }
}

(async () => main())();
