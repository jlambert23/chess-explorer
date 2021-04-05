import { useState } from 'react';

import Sidebar from './Sidebar';
import Chessboard from './Chessboard';
import { useFetch } from '../apis';
import { useExplorer } from '../apis/explorer.api';
import { Move } from '../models/explorer.model';
import { Player } from '../models/player.model';

const Explorer = () => {
  const [explorer, setExplorer] = useExplorer();
  const [moves, setMoves] = useState([] as Move[]);
  const { data: players } = useFetch<Player[]>('player');

  return (
    <div className='flex justify-center gap-10'>
      <Chessboard position={explorer?.fen} />
      <Sidebar
        players={players}
        moves={moves}
        nextMoves={explorer?.nextMoves}
        updateMoves={async (updated) => {
          if (explorer) {
            const move = updated[updated.length - 1];
            await setExplorer({ ...explorer, fen: move?.move.fen || 'start' });
            setMoves(updated);
          }
        }}
      />
    </div>
  );
};

export default Explorer;
