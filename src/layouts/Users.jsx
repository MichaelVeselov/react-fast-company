import { useParams } from 'react-router-dom';

import SingleUserPage from '../components/page/singleUserPage';
import UserListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/editUserPage/EditUserPage';

const Users = () => {
  const { userId, edit } = useParams();

  return userId ? (
    edit ? (
      <EditUserPage userId={userId} />
    ) : (
      <SingleUserPage userId={userId} />
    )
  ) : (
    <UserListPage />
  );
};

export default Users;
