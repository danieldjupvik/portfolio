import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AI from './pages/AI';
import Home from './pages/Home';
import MovieWatcht from './pages/MovieWatcht';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/moviewatcht' element={<MovieWatcht />} />
          <Route path='/ai' element={<AI />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
