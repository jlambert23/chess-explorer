import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Error from './Error';
import Explorer from './Explorer';
import Header from './Header';

const App = () => (
  <Router>
    <div className='bg-black h-screen grid grid-rows-home grid-cols-1 overflow-hidden'>
      <Header />
      <div className='bg-white'>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/explorer' />
          </Route>
          <Route path='/explorer'>
            <Explorer />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
