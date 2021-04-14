import { FunctionComponent, useState } from 'react';

import { fetcher } from '../../apis/index';
import { PlayerInfo } from '../../models/player.model';
import { Button, Card, Conditional, Label } from '../common';

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
        <Results player={player} onBack={() => setPlayer(null)} />
      ) : (
        <Search onSearch={onSearch} />
      )}
    </div>
  );
};

const Search: FunctionComponent<{ onSearch: (term: string) => void }> = ({
  onSearch,
}) => {
  const [input, setInput] = useState({ value: '' });
  return (
    <form
      className='w-full flex flex-col items-center'
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(input.value);
      }}
    >
      <div className='mb-4'>
        <label>Search Player:</label>
        <input
          value={input.value}
          onChange={(e) => setInput({ value: e.target.value })}
          className='ml-2 border-2 rounded pl-1'
        />
      </div>
      <Button
        type='submit'
        className='w-1/6 disabled:bg-gray-500 disabled:opacity-20'
        disabled={!input.value}
      >
        Search
      </Button>
    </form>
  );
};

const Results: FunctionComponent<{
  player: PlayerInfo;
  onBack?: () => void;
}> = ({ player, onBack }) => (
  <div className='w-full flex flex-col items-center'>
    <Card className='w-1/5 px-6 flex flex-col items-center'>
      <div className='w-full text-3xl font-medium text-center border-b-2 mb-2 pb-1'>
        {player.playerName}
      </div>
      <ul className='list-outside'>
        <Conditional condition={player.country}>
          <li>
            <Label>Country:</Label>
            {player.country}
          </li>
        </Conditional>
        <Conditional condition={player.rating}>
          <li>
            <Label>Rating:</Label>
            <ul className='list-outside'>
              <Conditional condition={player.rating['chess_daily']}>
                <li>
                  <Label>Daily:</Label>
                  {player.rating['chess_daily']}
                </li>
              </Conditional>
              <Conditional condition={player.rating['chess_rapid']}>
                <li>
                  <Label>Rapid:</Label>
                  {player.rating['chess_rapid']}
                </li>
              </Conditional>
              <Conditional condition={player.rating['chess_bullet']}>
                <li>
                  <Label>Bullet:</Label>
                  {player.rating['chess_bullet']}
                </li>
              </Conditional>
              <Conditional condition={player.rating['chess_blitz']}>
                <li>
                  <Label>Blitz:</Label>
                  {player.rating['chess_blitz']}
                </li>
              </Conditional>
            </ul>
          </li>
        </Conditional>
        <Conditional condition={player.games.loaded || player.games.unloaded}>
          <li>
            <Label>No. of Games:</Label>
            {player.games.loaded}
            <Conditional condition={player.games.unloaded}>
              <small className='text-green-400 ml-1'>
                ({player.games.unloaded} new)
              </small>
            </Conditional>
          </li>
        </Conditional>
      </ul>
    </Card>
    <Button className='mt-4 px-10' onClick={onBack}>
      Back
    </Button>
  </div>
);

export default LoadPlayers;
