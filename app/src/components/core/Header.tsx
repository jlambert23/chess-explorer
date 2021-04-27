import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../images/logo.png';
import { Toggle } from '../common';

export type HeaderProps = {
  toggleDark?: (value: boolean) => void;
  defaultDark?: boolean;
};

const Nav: FunctionComponent<{ to: string }> = ({ to, children }) => (
  <NavLink
    to={to}
    className='p-2 hover:underline'
    activeClassName='rounded border-2 hover:no-underline'
  >
    {children}
  </NavLink>
);

const Header: FunctionComponent<HeaderProps> = ({
  toggleDark,
  defaultDark = false,
}) => (
  <div className='px-4 py-1.5 flex font-mono'>
    <img src={logo} alt='Logo' />
    <div className='flex items-center font-bold text-5xl tracking-widest pr-10'>
      <NavLink to='/'>justchess</NavLink>
    </div>
    <div className='w-1/2 flex items-center gap-4 text-2xl font-semibold'>
      <Nav to='/explorer'>Explorer</Nav>
      <Nav to='players'>Players</Nav>
    </div>
    <Toggle
      label='Dark Mode'
      onChange={toggleDark}
      defaultChecked={defaultDark}
    />
  </div>
);
export default Header;
