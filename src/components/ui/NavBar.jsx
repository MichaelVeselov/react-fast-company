import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import NavProfile from './NavProfile';

const NavBar = () => {
  const { currentUser } = useAuth();

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
          {currentUser && (
            <li className='nav-item'>
              <NavLink to='/users' className={navLinkClasses()}>
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className='d-flex'>
          {currentUser ? (
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
