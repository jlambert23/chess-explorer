import React from 'react';

import { Card } from '../common';
import { FilterProps, FilterCard } from './Fitler';
import { MoveProps, MovesCard } from './Moves';
import { NavProps, NavCard } from './Nav';

type SidebarProps = FilterProps & MoveProps & NavProps;

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  players,
  filter,
  explorer,
  moves,
  updateMoves,
}) => (
  <div className='bg-black grid grid-rows-sidebar gap-2 p-2 rounded w-96'>
    <Card>
      <div className='font-bold text-3xl text-center'>Explorer</div>
    </Card>
    <FilterCard players={players} filter={filter} />
    <MovesCard moves={moves} explorer={explorer} updateMoves={updateMoves} />
    <NavCard moves={moves} explorer={explorer} updateMoves={updateMoves} />
  </div>
);
export default Sidebar;
