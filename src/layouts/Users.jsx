import { useParams } from 'react-router-dom';

import UserList from '../components/UserList';
import SingleUser from '../components/SingleUser';

const Users = () => {
  const { userId } = useParams();

  return userId ? <SingleUser userId={userId} /> : <UserList />;
};

export default Users;
