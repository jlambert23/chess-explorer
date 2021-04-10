import logo from '../images/logo.png';
import { Button } from './common';

const Header = () => (
  <div className='px-4 py-1.5 flex text-white font-mono'>
    <img src={logo} alt='Logo' />
    <div className='w-full flex items-center gap-4'>
      <div className='font-bold text-5xl tracking-widest pr-10'>justchess</div>
      <Button className='border-white border-2 focus:outline-none'>
        <div className='text-2xl font-semibold'>Explorer</div>
      </Button>
      <Button className='text-2xl font-semibold border-white hover:underline'>
        Load Players
      </Button>
    </div>
  </div>
);
export default Header;
