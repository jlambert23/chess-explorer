import Chessboardjsx, { Position } from 'chessboardjsx';

const BOARD_SIZE = 0.9;

const Chessboard = ({
  position = 'start',
}: {
  position?: string | Position;
}) => (
  <div>
    <Chessboardjsx
      calcWidth={(obj) => obj.screenHeight * BOARD_SIZE}
      draggable={false}
      position={position}
    />
  </div>
);
export default Chessboard;
