import { Redirect, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQuality';
import { AuthProvider } from './hooks/useAuth';

import NavBar from './components/ui/NavBar';
import MainPage from './layouts/MainPage';
import LoginPage from './layouts/LoginPage';
import Users from './layouts/Users';
import NotFoundPage from './layouts/NotFoundPage';

function App() {
  return (
    <div className='container-xl'>
      <AuthProvider>
        <NavBar />
        <main>
          <ProfessionProvider>
            <QualityProvider>
              <Switch>
                <Route path='/' component={MainPage} exact />
                <Route path='/login/:type?' component={LoginPage} />
                <Route path='/users/:userId?/:edit?' component={Users} />
                <Route path='/404' component={NotFoundPage} />
                <Redirect to='/404' />
              </Switch>
            </QualityProvider>
          </ProfessionProvider>
        </main>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
