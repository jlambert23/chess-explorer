import { useState } from 'react';

import { getPlayer, updatePlayerGames } from '../../apis/players.api';
import { PlayerInfo } from '../../models/player.model';
import Search from './Search';
import Result from './Result';

const LoadPlayers = () => {
  const [player, setPlayer] = useState<PlayerInfo | null>();

  const onSearch = async (term: string) => {
    const res = await getPlayer(term);
    setPlayer(res);
  };

  const onLoad = async () => {
    if (!player) return;
    const res = await updatePlayerGames(player.playerName);
    setPlayer(res);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='text-4xl font-bold my-6'>Players</div>
      {player ? (
        <Result
          player={player}
          onBack={() => setPlayer(null)}
          onLoad={onLoad}
        />
      ) : (
        <Search onSearch={onSearch} />
      )}
    </div>
  );
};

export default LoadPlayers;
