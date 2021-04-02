import React from 'react';

import { Move } from '../models/explorer.model';
import { Player } from './../models/player.model';

type FilterProps = { players?: Player[] };
type MoveProps = {
  moves?: Move[];
  nextMoves?: Move[];
  onMoveClick?: (move: Move) => void;
};
type SidebarProps = FilterProps & MoveProps;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type SelectProps = {
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  players,
  moves,
  nextMoves,
  onMoveClick,
}) => (
  <div className='bg-black grid grid-rows-sidebar gap-2 p-2 rounded w-96'>
    <HeaderCard />
    <FilterCard players={players} />
    <MovesCard moves={moves} nextMoves={nextMoves} onMoveClick={onMoveClick} />
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
  moves = [],
  nextMoves = [],
  onMoveClick = () => null,
}) => (
  <Card>
    <div className='grid gap-2'>
      <div className='border-b-2 flex flex-wrap text-sm pb-1'>
        {moves.map((move, i) => {
          const moveNo = i % 2 ? '' : `${Math.ceil(i / 2) + 1}.`;
          const current = i === moves.length - 1;
          return (
            <div
              key={move.move._id}
              className={`inline ${current ? '' : 'text-gray-600'}`}
            >
              {moveNo}
              <button
                className={`inline font-medium px-1 rounded-sm focus:outline-none hover:bg-gray-300 ${
                  current ? 'bg-gray-200' : ''
                }`}
              >
                {move.move.notation}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {nextMoves.map((move) => (
          <div key={move.move._id} className='grid grid-cols-2'>
            <button
              className='text-left focus:outline-none hover:text-blue-500'
              onClick={() => onMoveClick(move)}
            >
              {Math.floor(moves.length / 2) + 1}.{' '}
              {moves.length % 2 ? '...' : ''}
              {move.move.notation}
            </button>
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
