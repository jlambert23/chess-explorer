import * as parser from '@mliebelt/pgn-parser';
import * as fs from 'fs';

fs.readFile('./test-png.txt', 'utf8', (err, data) => {
  const moves = parser.parse(data, { startRule: 'games' });
  console.log(moves.length);
});
