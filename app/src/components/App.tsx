import Explorer from './Explorer';
import Header from './Header';

const App = () => (
  <div className='bg-black h-screen grid grid-rows-home grid-cols-1 overflow-hidden'>
    <Header />
    <div className='bg-white flex flex-col justify-center'>
      <Explorer />
    </div>
  </div>
);

export default App;
