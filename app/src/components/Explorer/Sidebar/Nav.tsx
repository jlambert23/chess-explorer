import React from 'react';

import { Button, Card } from '../../common';
import { MoveProps } from './Moves';

export type NavProps = MoveProps;

export const NavCard: React.FunctionComponent<NavProps> = ({
  explorer,
  moves = [],
  updateMoves,
}) => (
  <Card>
    <div className='flex w-full h-full gap-2'>
      <Button
        className='w-full'
        onClick={() => (moves.length ? updateMoves(moves.slice(0, -1)) : null)}
      >
        {'<'}
      </Button>
      <Button className='w-full' onClick={() => updateMoves([])}>
        Reset
      </Button>
      <Button
        className='w-full'
        onClick={() =>
          explorer.nextMoves?.length
            ? updateMoves([...moves, explorer.nextMoves[0]])
            : null
        }
      >
        {'>'}
      </Button>
    </div>
  </Card>
);
