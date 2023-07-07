import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
    // eslint-disable-next-line
  }, []);

  return <h2>Loading...</h2>;
};

export default LogOut;
