import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const navLinkClasses = () => (isActive) =>
    'nav-link fw-bold' + (isActive ? ' bg-primary text-white' : '');

  return (
    <ul className='nav nav-tabs justify-content-center mb-5'>
      <li className='nav-item'>
        <NavLink exact to='/' className={navLinkClasses()}>
          Main Page
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/login' className={navLinkClasses()}>
          Login Page
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/users' className={navLinkClasses()}>
          Users Page
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
