import React, { useState } from 'react';

import { Move } from '../models/explorer.model';
import { ExplorerData } from './../models/explorer.model';
import { Player } from './../models/player.model';

type FilterProps = {
  players?: Player[];
  filter?: (options: {
    playerName?: string;
    color?: 'white' | 'black';
  }) => void;
};
type MoveProps = {
  explorer: ExplorerData;
  moves?: Move[];
  updateExplorer: (explorer: ExplorerData) => Promise<void>;
  updateMoves: (moves: Move[]) => void;
};
type NavProps = MoveProps;
type SidebarProps = FilterProps & MoveProps & NavProps;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type SelectProps = {
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  players,
  filter,
  explorer,
  moves,
  updateExplorer,
  updateMoves,
}) => (
  <div className='bg-black grid grid-rows-sidebar gap-2 p-2 rounded w-96'>
    <HeaderCard />
    <FilterCard players={players} filter={filter} />
    <MovesCard
      moves={moves}
      explorer={explorer}
      updateExplorer={updateExplorer}
      updateMoves={updateMoves}
    />
    <NavCard
      moves={moves}
      explorer={explorer}
      updateExplorer={updateExplorer}
      updateMoves={updateMoves}
    />
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
  <div className='flex w-full'>
    {label ? <label className='font-bold'>{label}</label> : ''}
    <select className='rounded border mx-2 w-full pl-0.5' {...selectAttributes}>
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

const FilterCard: React.FunctionComponent<FilterProps> = ({
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

const MovesCard: React.FunctionComponent<MoveProps> = ({
  explorer,
  moves = [],
  updateExplorer,
  updateMoves,
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
                onClick={() =>
                  updateExplorerMoves(
                    updateExplorer,
                    updateMoves,
                    explorer,
                    moves.slice(0, i + 1)
                  )
                }
              >
                {move.move.notation}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {explorer.nextMoves?.map((move) => (
          <div key={move.move._id} className='grid grid-cols-2'>
            <button
              className='text-left focus:outline-none hover:text-blue-500'
              onClick={() =>
                updateExplorerMoves(updateExplorer, updateMoves, explorer, [
                  ...moves,
                  move,
                ])
              }
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

const NavCard: React.FunctionComponent<NavProps> = ({
  explorer,
  moves = [],
  updateExplorer,
  updateMoves,
}) => (
  <Card>
    <div className='flex w-full h-full gap-2'>
      <Button
        onClick={() => {
          if (moves.length) {
            updateExplorerMoves(
              updateExplorer,
              updateMoves,
              explorer,
              moves.slice(0, -1)
            );
          }
        }}
      >
        {'<'}
      </Button>
      <Button
        onClick={() =>
          updateExplorerMoves(updateExplorer, updateMoves, explorer, [])
        }
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          if (explorer.nextMoves?.length) {
            const move = explorer.nextMoves[0];
            updateExplorerMoves(updateExplorer, updateMoves, explorer, [
              ...moves,
              move,
            ]);
          }
        }}
      >
        {'>'}
      </Button>
    </div>
  </Card>
);

const updateExplorerMoves = async (
  updateExplorer: (explorer: ExplorerData) => Promise<void>,
  updateMoves: (moves: Move[]) => void,
  explorer: ExplorerData,
  updatedMoves: Move[]
) => {
  const move = updatedMoves[updatedMoves.length - 1];
  await updateExplorer({ ...explorer, fen: move?.move.fen || 'start' });
  updateMoves(updatedMoves);
};
