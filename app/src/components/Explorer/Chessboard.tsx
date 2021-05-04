import { useEffect, useState } from 'react';
import Chessground, {
  Color,
  Dests,
  DrawShape,
  Key,
  Piece,
} from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import Chess, { ChessInstance, Square } from 'chess.js';

import { ReactComponent as FlipSvg } from '../../images/flip.svg';
import { Move } from '../../models/explorer.model';

interface ChessboardProps {
  position?: string;
  hover?: Move | null;
  lastMove?: Key[];
  onBoardMove?: (move: Move) => void;
}

const newChess = (fen?: string) =>
  // @ts-ignore
  new Chess(fen === 'start' ? undefined : fen) as ChessInstance;

const calcDests = (chess: ChessInstance) =>
  chess.SQUARES.reduce((acc, square) => {
    const moves = chess.moves({ square, verbose: true }).map(({ to }) => to);
    if (moves.length) acc.set(square, moves);
    return acc;
  }, new Map() as Dests);

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
  onBoardMove = () => null,
}: ChessboardProps) => {
  const [chess, setChess] = useState(newChess());
  const [dests, setDests] = useState(calcDests(chess));
  const [animation, setAnimation] = useState({ enabled: true });
  const [orientation, setOrientation] = useState('white' as Color);

  useEffect(() => {
    const updated = newChess(position);
    setChess(updated);
    setDests(calcDests(updated));
  }, [position]);

  const onFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  const onMove: (from: Key, to: Key, capture?: Piece) => void = (from, to) => {
    const instance = newChess(chess.fen());
    const move = instance.move({ from: from as Square, to: to as Square });

    if (move) {
      if (animation.enabled) {
        setAnimation({ enabled: false });
        setTimeout(() => setAnimation({ enabled: true }), 200);
      }

      onBoardMove({
        move: {
          fen: instance.fen(),
          color: instance.turn() === 'w' ? 'white' : 'black',
          from: move.from,
          to: move.to,
          notation: instance.history().pop(),
        },
      });
    }
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
        animation={animation}
        orientation={orientation}
        movable={{ free: false, dests }}
        onMove={onMove}
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
