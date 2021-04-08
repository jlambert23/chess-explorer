import { useState } from 'react';
import { Key } from 'react-chessground';

import Sidebar from './Sidebar';
import Chessboard from './Chessboard';
import { useFetch } from '../apis';
import { useExplorer } from '../apis/explorer.api';
import { Move } from '../models/explorer.model';
import { Player } from '../models/player.model';

const Explorer = () => {
  const [explorer, setExplorer] = useExplorer();
  const [moves, setMoves] = useState<Move[]>([]);
  const { data: players } = useFetch<Player[]>('player');

  function getLastMove(): Key[] {
    const last = moves[moves.length - 1];
    return last?.move.from && last?.move.to
      ? [last.move.from, last.move.to]
      : [];
  }

  return (
    <div className='flex justify-center gap-10 h-screen-90'>
      <Chessboard position={explorer?.fen} lastMove={getLastMove()} />
      <Sidebar
        players={players}
        filter={({ playerName, color }) => {
          explorer.source = playerName || explorer.source;
          explorer.color = color || explorer.color;
          setExplorer(explorer);
        }}
        explorer={explorer}
        moves={moves}
        updateExplorer={setExplorer}
        updateMoves={setMoves}
      />
    </div>
  );
};

export default Explorer;
