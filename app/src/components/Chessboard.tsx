import Chessground, { Key } from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

const BOARD_SIZE = '90vh';

interface ChessboardProps {
  position?: string;
  lastMove?: Key[];
}

const Chessboard = ({ position = 'start', lastMove = [] }: ChessboardProps) => (
  <div>
    <Chessground
      width={BOARD_SIZE}
      height={BOARD_SIZE}
      fen={position}
      selected={''}
      lastMove={lastMove}
    />
  </div>
);
export default Chessboard;
