import Chessground, { DrawShape, Key } from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

import { Move } from '../models/explorer.model';

const BOARD_SIZE = '80vh';

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
  <div>
    <Chessground
      width={BOARD_SIZE}
      height={BOARD_SIZE}
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
