import { Redirect, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppLoader from './components/ui/hoc/AppLoader';

import ProtectedRoute from './components/common/ProtectedRoute';

import NavBar from './components/ui/NavBar';
import MainPage from './layouts/MainPage';
import LoginPage from './layouts/LoginPage';
import Users from './layouts/Users';
import LogOut from './layouts/LogOut';
import NotFoundPage from './layouts/NotFoundPage';

function App() {
  return (
    <div className='container-xl'>
      <AppLoader>
        <NavBar />
        <main>
          <Switch>
            <Route path='/' component={MainPage} exact />
            <Route path='/login/:type?' component={LoginPage} />
            <Route path='/logout' component={LogOut} />
            <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
            <Route path='/404' component={NotFoundPage} />
            <Redirect to='/404' />
          </Switch>
        </main>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
