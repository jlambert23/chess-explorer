import React from 'react';

import { ExplorerData, Move } from '../../models/explorer.model';
import { Card } from '../common';

export type MoveProps = {
  explorer: ExplorerData;
  moves?: Move[];
  updateHover?: (move: Move | null) => void;
  updateMoves: (moves: Move[]) => void;
};

export const MovesCard: React.FunctionComponent<MoveProps> = (props) => (
  <Card>
    <div className='flex flex-col h-full'>
      <MovesHistory {...props} />
      <MovesList {...props} />
    </div>
  </Card>
);

const MovesHistory: React.FunctionComponent<MoveProps> = ({
  moves = [],
  updateMoves,
}) => (
  <div className='border-b-2 flex flex-wrap text-sm pb-1'>
    {moves.map((move, i) => {
      const moveNo = i % 2 ? '' : `${Math.ceil(i / 2) + 1}.`;
      const current = i === moves.length - 1;
      return (
        <div
          key={move.move.notation}
          className={`inline ${current ? '' : 'text-gray-600'}`}
        >
          {moveNo}
          <button
            className={`inline font-medium px-1 rounded-sm focus:outline-none hover:bg-gray-300 ${
              current ? 'bg-gray-200' : ''
            }`}
            onClick={() => updateMoves(moves.slice(0, i + 1))}
          >
            {move.move.notation}
          </button>
        </div>
      );
    })}
  </div>
);

const MovesList: React.FunctionComponent<MoveProps> = ({
  explorer,
  moves = [],
  updateHover = () => null,
  updateMoves,
}) => (
  <div className='overflow-auto'>
    {explorer.nextMoves?.map((move) => (
      <div key={move.move.notation} className='grid grid-cols-2'>
        <button
          className='text-left focus:outline-none hover:text-blue-500'
          onClick={() => updateMoves([...moves, move])}
          onMouseOver={() => updateHover(move)}
          onMouseLeave={() => updateHover(null)}
        >
          {Math.floor(moves.length / 2) + 1}.{' '}
          {move.move.color === 'white' ? '' : '...'}
          {move.move.notation}
        </button>
        <div>
          ({move.whiteWon}/{move.blackWon}/{move.draw})
        </div>
      </div>
    ))}
  </div>
);
