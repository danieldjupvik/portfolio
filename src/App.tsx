import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HeroBackground } from './components/HeroBackground';
import { CustomerProvider } from './contexts/CustomerContext';
import AI from './pages/AI';
import AIPrivacyPolicy from './pages/AIPrivacyPolicy';
import AITermsOfServicePage from './pages/AITermsOfServicePage';
import CustomerPortal from './pages/customer-portal';
import Home from './pages/Home';
import MovieWatcht from './pages/MovieWatcht';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className='App'>
      <HeroBackground />
      <CustomerProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/moviewatcht' element={<MovieWatcht />} />
            <Route path='/ai' element={<AI />} />
            <Route path='/ai/privacy-policy' element={<AIPrivacyPolicy />} />
            <Route
              path='/ai/terms-of-service'
              element={<AITermsOfServicePage />}
            />
            <Route path='/customer-portal' element={<CustomerPortal />} />
          </Routes>
        </Router>
      </CustomerProvider>
    </div>
  );
}

export default App;
