import { FunctionComponent } from 'react';

import { PlayerInfo } from '../../models/player.model';
import { Button, Card, Conditional, Label } from '../common';

const Result: FunctionComponent<{
  player: PlayerInfo;
  onBack?: () => void;
  onLoad?: () => void;
}> = ({ player, onBack, onLoad }) => {
  const hasGames = player.games.count || player.games.new;
  return (
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
          <Conditional condition={hasGames}>
            <li>
              <Label>No. of Games:</Label>
              {player.games.count}
              <Conditional condition={player.games.new}>
                <small className='text-green-400 ml-1'>
                  ({player.games.new} new)
                </small>
              </Conditional>
            </li>
          </Conditional>
        </ul>
      </Card>
      <Conditional condition={!hasGames}>
        <div className='text-center font-semibold text-white bg-yellow-400 mt-4 px-2 rounded'>
          No games have been loaded for this player.
        </div>
      </Conditional>
      <div className='flex gap-4 mt-4'>
        <Button className='px-10' onClick={onBack}>
          Back
        </Button>
        <Button
          className={`px-4 text-white border-white ${
            hasGames
              ? 'bg-green-500 hover:bg-green-600 focus:border-green-300'
              : 'bg-red-500 hover:bg-red-600 focus:border-red-300'
          }`}
          onClick={onLoad}
        >
          {hasGames ? 'Refresh' : 'Load'} Games
        </Button>
      </div>
    </div>
  );
};
export default Result;
