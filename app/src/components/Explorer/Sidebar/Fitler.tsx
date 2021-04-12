import React, { useState } from 'react';

import { Player } from '../../../models/player.model';
import { Card, Select } from '../../common';

export type FilterProps = {
  players?: Player[];
  filter?: (options: {
    playerName?: string;
    color?: 'white' | 'black';
  }) => void;
};

export const FilterCard: React.FunctionComponent<FilterProps> = ({
  players = [],
  filter = () => null,
}) => {
  const [{ playerName, color }, setOptions] = useState({
    playerName: 'all',
    color: 'white',
  });

  return (
    <Card>
      <div className='h-full grid grid-cols-2 place-items-center'>
        <Select
          label='Player:'
          defaultValue={playerName}
          onChange={({ target: { value } }) => {
            setOptions({ playerName: value, color });
            filter({ playerName: value });
          }}
        >
          <option>all</option>
          {players.map(({ _id, playerName }) => (
            <option key={_id}>{playerName}</option>
          ))}
        </Select>
        {playerName === 'all' ? null : (
          <Select
            label='Color:'
            defaultValue={color}
            onChange={({ target: { value } }) => {
              if (value === 'white' || value === 'black') {
                setOptions({ playerName, color: value });
                filter({ color: value });
              }
            }}
          >
            <option>white</option>
            <option>black</option>
          </Select>
        )}
      </div>
    </Card>
  );
};
