import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.png';

const Nav: FunctionComponent<{ to: string }> = ({ to, children }) => (
  <NavLink
    to={to}
    className='p-2 hover:underline'
    activeClassName='rounded border border-white hover:no-underline'
  >
    {children}
  </NavLink>
);

const Header = () => (
  <div className='px-4 py-1.5 flex text-white font-mono'>
    <img src={logo} alt='Logo' />
    <div className='flex items-center font-bold text-5xl tracking-widest pr-10'>
      <NavLink to='/'>justchess</NavLink>
    </div>
    <div className='w-full flex items-center gap-4 text-2xl font-semibold'>
      <Nav to='/explorer'>Explorer</Nav>
      <Nav to='players'>Players</Nav>
    </div>
  </div>
);
export default Header;
