import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AI from './pages/AI';
import Home from './pages/Home';
import MovieWatcht from './pages/MovieWatcht';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/moviewatcht' component={MovieWatcht} />
          <Route path='/ai' component={AI} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
