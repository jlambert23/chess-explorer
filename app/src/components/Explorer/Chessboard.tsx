import Chessground, { Color, DrawShape, Key } from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

import { Move } from '../../models/explorer.model';

interface ChessboardProps {
  position?: string;
  hover?: Move | null;
  lastMove?: Key[];
}

const Chessboard = ({
  position = 'start',
  hover,
  lastMove = [],
}: ChessboardProps) => (
  <div className='w-screen-80 h-screen-80'>
    <Chessground
      width='100%'
      height='100%'
      fen={position}
      selected={''}
      lastMove={lastMove}
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
export default Chessboard;
