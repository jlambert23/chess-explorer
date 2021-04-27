import { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Error from './core/Error';
import Header from './core/Header';
import Explorer from './Explorer';
import Players from './Players';

const App = () => {
  const [dark, setDark] = useState('light' as 'light' | 'dark');

  return (
    <Router>
      <div
        className={`${dark} bg-0 text-0 h-screen grid grid-rows-home grid-cols-1 overflow-hidden`}
      >
        <Header toggleDark={(val) => setDark(val ? 'dark' : 'light')} />
        <div className='bg-1 text-1'>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/explorer' />
            </Route>
            <Route path='/explorer'>
              <Explorer />
            </Route>
            <Route path='/players'>
              <Players></Players>
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
