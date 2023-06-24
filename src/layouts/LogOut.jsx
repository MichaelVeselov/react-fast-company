import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const LogOut = () => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
    // eslint-disable-next-line
  }, []);
  return <h2>Loading...</h2>;
};

export default LogOut;
