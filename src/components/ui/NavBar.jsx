import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getIsLoggedIn } from '../../store/users';

import NavProfile from './NavProfile';

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  const navLinkClasses = () => (isActive) =>
    'nav-link fw-bold' + (isActive ? ' bg-primary text-white' : '');

  return (
    <nav className='navbar bg-light mb-3'>
      <div className='container-fluid'>
        <ul className='nav nav-tabs justify-content-center mb-5'>
          <li className='nav-item'>
            <NavLink exact to='/' className={navLinkClasses()}>
              Main Page
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className='nav-item'>
              <NavLink to='/users' className={navLinkClasses()}>
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className='d-flex'>
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <NavLink to='/login' className={navLinkClasses()}>
              Login Page
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
