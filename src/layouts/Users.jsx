import { useParams } from 'react-router-dom';
import UserProvider from '../hooks/useUser';

import SingleUserPage from '../components/page/singleUserPage';
import UserListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/editUserPage/EditUserPage';

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <UserProvider>
      {userId ? (
        edit ? (
          <EditUserPage userId={userId} />
        ) : (
          <SingleUserPage userId={userId} />
        )
      ) : (
        <UserListPage />
      )}
    </UserProvider>
  );
};

export default Users;
