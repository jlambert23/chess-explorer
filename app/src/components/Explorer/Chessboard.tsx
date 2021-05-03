import { useEffect, useState } from 'react';
import { useState } from 'react';
import Chessground, { Color, DrawShape, Key } from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import Chess, { ChessInstance } from 'chess.js';

import { ReactComponent as FlipSvg } from '../../images/flip.svg';
import { Move } from '../../models/explorer.model';

interface ChessboardProps {
  position?: string;
  hover?: Move | null;
  lastMove?: Key[];
}

const newChess = (fen?: string) => {
  const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  // @ts-ignore
  return new Chess(fen === 'start' ? start : fen);
};

const FlipButton = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className='focus:outline-none'>
    <div className='text-0 w-6'>
      <FlipSvg />
    </div>
  </button>
);

const Chessboard = ({
  position = 'start',
  hover,
  lastMove = [],
}: ChessboardProps) => {
  const [chess, setChess] = useState<ChessInstance>(newChess());
  const [orientation, setOrientation] = useState('white' as Color);

  useEffect(() => {
    setChess(newChess(position));
  }, [position]);

  const onFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  return (
    <div className='bg-0 rounded p-7 w-screen-80 h-screen-80'>
      <div className='float-right'>
        <div className='fixed z-10 -m-6'>
          <FlipButton onClick={onFlip} />
        </div>
      </div>
      <Chessground
        width='100%'
        height='100%'
        fen={chess.fen()}
        selected={''}
        lastMove={lastMove}
        orientation={orientation}
        drawable={{
          autoShapes: hover?.move
            ? [
                {
                  brush: 'green',
                  dest: hover.move.to,
                  orig: hover.move.from,
                } as DrawShape,
              ]
            : [],
        }}
      />
    </div>
  );
};
export default Chessboard;
