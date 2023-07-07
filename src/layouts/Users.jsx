import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/UsersLoader';

import SingleUserPage from '../components/page/singleUserPage';
import UserListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/editUserPage/EditUserPage';

const Users = () => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          userId === currentUserId ? (
            <EditUserPage />
          ) : (
            <Redirect to={`/users/${currentUserId}/edit`} />
          )
        ) : (
          <SingleUserPage userId={userId} />
        )
      ) : (
        <UserListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
