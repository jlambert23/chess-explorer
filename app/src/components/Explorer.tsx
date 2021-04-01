import Sidebar from './Sidebar';
import Chessboard from './Chessboard';

import { useFetch, useFetchBody } from '../apis';
import { ExplorerData } from '../models/explorer.model';
import { Player } from '../models/player.model';

const initExplorer = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  color: 'white',
  source: 'all',
};

const Explorer = () => {
  const { data: players } = useFetch<Player[]>('player');
  const { data: explorer } = useFetchBody<ExplorerData>(
    'explorer',
    initExplorer
  );

  return (
    <div className='flex justify-center gap-10'>
      <Chessboard />
      <Sidebar players={players} nextMoves={explorer?.nextMoves} />
    </div>
  );
};

export default Explorer;
