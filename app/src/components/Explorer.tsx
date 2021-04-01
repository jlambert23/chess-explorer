import Sidebar from './Sidebar';
import Chessboard from './Chessboard';
import { useFetch } from '../apis';
import { Player } from '../models/player.model';

const Explorer = () => {
  const { data: players } = useFetch<Player[]>('player');

  return (
    <div className='flex justify-center gap-10'>
      <Chessboard />
      <Sidebar players={players} />
    </div>
  );
};

export default Explorer;
