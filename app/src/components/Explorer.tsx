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
        onMoveClick={async (move, index) => {
          if (explorer) {
            await setExplorer({ ...explorer, fen: move.move.fen });
            if (index != null) {
              setMoves(moves.slice(0, index + 1));
            } else {
              setMoves([...moves, move]);
            }
          }
        }}
      />
    </div>
  );
};

export default Explorer;
