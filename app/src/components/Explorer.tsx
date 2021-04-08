import { useState } from 'react';

import Sidebar from './Sidebar/Sidebar';
import Chessboard from './Chessboard';
import { useFetch } from '../apis';
import { useExplorer } from '../apis/explorer.api';
import { Move } from '../models/explorer.model';
import { Player } from '../models/player.model';

const Explorer = () => {
  const [explorer, setExplorer] = useExplorer();
  const [moves, setMoves] = useState<Move[]>([]);
  const { data: players } = useFetch<Player[]>('player');

  const getLastMove = () => {
    const last = moves[moves.length - 1];
    return last?.move.from && last?.move.to
      ? [last.move.from, last.move.to]
      : [];
  };

  const updateMoves = async (updatedMoves: Move[]) => {
    const move = updatedMoves[updatedMoves.length - 1];
    await setExplorer({ ...explorer, fen: move?.move.fen || 'start' });
    setMoves(updatedMoves);
  };

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
        updateMoves={updateMoves}
      />
    </div>
  );
};

export default Explorer;
