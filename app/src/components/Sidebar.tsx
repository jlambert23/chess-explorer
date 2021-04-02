import React from 'react';

import { Move } from '../models/explorer.model';
import { Player } from './../models/player.model';

type FilterProps = { players?: Player[] };
type MoveProps = { nextMoves?: Move[]; onMoveClick?: (move: Move) => void };
type SidebarProps = FilterProps & MoveProps;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type SelectProps = {
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  players,
  nextMoves,
  onMoveClick,
}) => (
  <div className='bg-black grid grid-rows-sidebar gap-2 p-2 rounded'>
    <HeaderCard />
    <FilterCard players={players} />
    <MovesCard nextMoves={nextMoves} onMoveClick={onMoveClick} />
    <NavCard />
  </div>
);
export default Sidebar;

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  ...buttonAttributes
}) => (
  <button className='w-full border-2 rounded' {...buttonAttributes}>
    {children}
  </button>
);

const Select: React.FunctionComponent<SelectProps> = ({
  children,
  label,
  ...selectAttributes
}) => (
  <div className='flex'>
    {label ? <label className='font-bold'>{label}</label> : ''}
    <select className='border mx-2' {...selectAttributes}>
      {children}
    </select>
  </div>
);

const Card: React.FunctionComponent = ({ children }) => (
  <div className='bg-white rounded p-2'>{children}</div>
);

const HeaderCard = () => (
  <Card>
    <div className='font-bold text-3xl text-center'>Explorer</div>
  </Card>
);

const FilterCard: React.FunctionComponent<FilterProps> = ({ players = [] }) => (
  <Card>
    <div className='h-full flex items-center'>
      <div className='flex'>
        <Select label='Player:' defaultValue='all'>
          <option>all</option>
          {players.map(({ _id, playerName }) => (
            <option key={_id}>{playerName}</option>
          ))}
        </Select>
        <Select label='Color:' defaultValue='white'>
          <option>white</option>
          <option>black</option>
        </Select>
      </div>
    </div>
  </Card>
);

const MovesCard: React.FunctionComponent<MoveProps> = ({
  nextMoves = [],
  onMoveClick = () => null,
}) => (
  <Card>
    <div className='grid gap-2'>
      <div className='border-b-2'>1. e4 e5 2. Nf3 Nc6</div>
      <div>
        {nextMoves.map((move) => (
          <div key={move.move._id} className='grid grid-cols-2'>
            <div
              className='hover:text-blue-500 cursor-pointer'
              onClick={() => onMoveClick(move)}
            >
              1. {move.move.notation}
            </div>
            <div>
              ({move.whiteWon}/{move.blackWon}/{move.draw})
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const NavCard = () => (
  <Card>
    <div className='flex w-full h-full gap-2'>
      <Button>{'<'}</Button>
      <Button>Reset</Button>
      <Button>{'>'}</Button>
    </div>
  </Card>
);
