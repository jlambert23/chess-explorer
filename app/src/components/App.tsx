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
  const [dark, setDark] = useState('' as '' | 'dark');

  return (
    <Router>
      <div
        className={`${dark} bg-black h-screen grid grid-rows-home grid-cols-1 overflow-hidden`}
      >
        <Header toggleDark={(val) => setDark(val ? 'dark' : '')} />
        <div className='bg-white'>
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
