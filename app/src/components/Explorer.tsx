import Sidebar from './Sidebar';
import Chessboard from './Chessboard';

const Explorer = () => (
  <div className='flex justify-center gap-10'>
    <Chessboard />
    <Sidebar />
  </div>
);

export default Explorer;
