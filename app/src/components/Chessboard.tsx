import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';

const BOARD_SIZE = '90vh';

const Chessboard = ({ position = 'start' }: { position?: string }) => (
  <div>
    <Chessground width={BOARD_SIZE} height={BOARD_SIZE} fen={position} />
  </div>
);
export default Chessboard;
