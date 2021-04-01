import { FunctionComponent } from 'react';

import { Player } from './../models/player.model';

type FilterProps = { players?: Player[] };
type SidebarProps = FilterProps;

const Sidebar: FunctionComponent<SidebarProps> = ({ players }) => (
  <div className='bg-black grid grid-rows-sidebar gap-2 p-2 rounded'>
    <HeaderCard />
    <FilterCard players={players} />
    <MovesCard />
    <NavCard />
  </div>
);
export default Sidebar;

const Button: FunctionComponent = ({ children }) => (
  <button className='w-full border-2 rounded'>{children}</button>
);

const Select: FunctionComponent<{ label?: string }> = ({ children, label }) => (
  <div className='flex'>
    {label ? <label className='font-bold'>{label}</label> : ''}
    <select className='border mx-2'>{children}</select>
  </div>
);

const Card: FunctionComponent = ({ children }) => (
  <div className='bg-white rounded p-2'>{children}</div>
);

const HeaderCard = () => (
  <Card>
    <div className='font-bold text-3xl text-center'>Explorer</div>
  </Card>
);

const FilterCard: FunctionComponent<FilterProps> = ({ players = [] }) => (
  <Card>
    <div className='h-full flex items-center'>
      <div className='flex'>
        <Select label='Player:'>
          <option selected>all</option>
          {players.map(({ _id, playerName }) => (
            <option key={_id}>{playerName}</option>
          ))}
        </Select>
        <Select label='Color:'>
          <option selected>white</option>
          <option>black</option>
        </Select>
      </div>
    </div>
  </Card>
);

const MovesCard = () => (
  <Card>
    <div className='grid gap-2'>
      <div className='border-b-2'>1. e4 e5 2. Nf3 Nc6</div>
      <div>
        <div>3. d4</div>
        <div>3. Nc3</div>
        <div>3. c4</div>
        <div>3. g3</div>
        <div>3. b3</div>
      </div>
    </div>
  </Card>
);

const NavCard = () => (
  <Card>
    <div className='flex w-full h-full gap-2'>
      <Button>{'<'}</Button>
      <Button>Reset</Button>
      <Button>{'>'}</Button>
    </div>
  </Card>
);
