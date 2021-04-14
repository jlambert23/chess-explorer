import { useState } from 'react';

import { fetcher } from '../../apis/index';
import { PlayerInfo } from '../../models/player.model';
import Search from './Search';
import Result from './Result';

const LoadPlayers = () => {
  const [player, setPlayer] = useState<PlayerInfo | null>();

  const onSearch = async (term: string) => {
    const player = await fetcher<PlayerInfo>(`player/${term}`);
    setPlayer(player);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='text-4xl font-bold my-6'>Load Players</div>
      {player ? (
        <Result player={player} onBack={() => setPlayer(null)} />
      ) : (
        <Search onSearch={onSearch} />
      )}
    </div>
  );
};

export default LoadPlayers;
