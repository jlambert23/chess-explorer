import Sidebar from './Sidebar';
import Chessboard from './Chessboard';
import { useFetch } from '../apis';
import { useExplorer } from '../apis/explorer.api';
import { Player } from '../models/player.model';

const Explorer = () => {
  const [explorer, setExplorer] = useExplorer();
  const { data: players } = useFetch<Player[]>('player');

  return (
    <div className='flex justify-center gap-10'>
      <Chessboard position={explorer?.fen} />
      <Sidebar
        players={players}
        nextMoves={explorer?.nextMoves}
        onMoveClick={(move) =>
          explorer ? setExplorer({ ...explorer, fen: move.move.fen }) : null
        }
      />
    </div>
  );
};

export default Explorer;
