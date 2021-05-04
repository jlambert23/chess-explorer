import { useState } from 'react';

import { useFetch } from '../../apis';
import { useExplorer } from '../../apis/explorer.api';
import { Move } from '../../models/explorer.model';
import { Player } from '../../models/player.model';
import Sidebar from './Sidebar/Sidebar';
import Chessboard from './Chessboard';

const Explorer = () => {
  const [explorer, setExplorer] = useExplorer();
  const [moves, setMoves] = useState<Move[]>([]);
  const [hover, setHover] = useState<Move | null>();
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
    setHover(null);
  };

  const onBoardMove = async (move: Move) => {
    await setExplorer({ ...explorer, fen: move.move.fen });
    setMoves([...moves, move]);
  };

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='flex justify-center gap-14 h-screen-80'>
        <Chessboard
          position={explorer?.fen}
          hover={hover}
          lastMove={getLastMove()}
          onBoardMove={onBoardMove}
        />
        <Sidebar
          players={players}
          filter={({ playerName, color }) => {
            explorer.source = playerName || explorer.source;
            explorer.color = color || explorer.color;
            setExplorer(explorer);
          }}
          explorer={explorer}
          moves={moves}
          updateHover={setHover}
          updateMoves={updateMoves}
        />
      </div>
    </div>
  );
};

export default Explorer;
