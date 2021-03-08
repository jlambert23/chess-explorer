import * as parser from '@mliebelt/pgn-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { ChessExplorerTrie } from './chess-explorer-trie';

const user = 'justuntinian';

fs.readFile('./test-png.txt', 'utf8', (_, data) => {
  const games = parser.parse(data, { startRule: 'games' });

  const whiteGames = games.filter((game) => game.tags.White === user);
  const whiteExplorer = new ChessExplorerTrie(whiteGames);
  dumpExplorer(whiteExplorer, 'white');

  const blackGames = games.filter((game) => game.tags.Black === user);
  const blackExplorer = new ChessExplorerTrie(blackGames);
  dumpExplorer(blackExplorer, 'black');
});

function dumpExplorer(explorer: ChessExplorerTrie, path: string) {
  const toJson = (value: any) => JSON.stringify(value, null, 1);
  const toYaml = (value: any) => yaml.dump(value);

  const _path = `out/${path}`;
  fs.mkdirSync(_path, { recursive: true });

  const rootJsonPath = `${_path}/root.json`;
  fs.writeFileSync(rootJsonPath, toJson(explorer.root));
  console.log('updated ' + rootJsonPath);

  const notationJsonPath = `${_path}/notation.json`;
  fs.writeFileSync(notationJsonPath, toJson(explorer.toNotation()));
  console.log('updated ' + notationJsonPath);

  const rootYamlPath = `${_path}/root.yaml`;
  fs.writeFileSync(rootYamlPath, toYaml(explorer.root));
  console.log('updated ' + rootYamlPath);

  const notationYamlPath = `${_path}/notation.yaml`;
  fs.writeFileSync(notationYamlPath, toYaml(explorer.toNotation()));
  console.log('updated ' + notationYamlPath);
}
