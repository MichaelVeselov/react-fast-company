import { Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './components/ui/NavBar';
import MainPage from './layouts/MainPage';
import LoginPage from './layouts/LoginPage';
import Users from './layouts/Users';
import NotFoundPage from './layouts/NotFoundPage';

function App() {
  return (
    <div className='container-xl'>
      <NavBar />
      <main>
        <Switch>
          <Route path='/' component={MainPage} exact />
          <Route path='/login' component={LoginPage} />
          <Route path='/users/:userId?' component={Users} />
          <Route path='/404' component={NotFoundPage} />
          <Redirect to='/404' />
        </Switch>
      </main>
    </div>
  );
}

export default App;
