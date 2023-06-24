import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { randomInteger } from '../../utils/randomInteger';

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);

  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{currentUser?.name}</div>
        <img
          src={currentUser?.image}
          className='rounded-circle shadow-1-strong me-3'
          alt='avatar'
          width='40'
          height='40'
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link to={`/users/${currentUser?._id}`} className='dropdown-item'>
          Profile
        </Link>
        <Link to='/logout' className='dropdown-item'>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
