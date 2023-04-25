import { useParams } from 'react-router-dom';

import SingleUserPage from '../components/page/singleUserPage';
import UserListPage from '../components/page/userListPage';

const Users = () => {
  const { userId } = useParams();

  return userId ? <SingleUserPage userId={userId} /> : <UserListPage />;
};

export default Users;
