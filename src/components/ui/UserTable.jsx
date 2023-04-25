import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import BookMark from '../common/BookMark';
import Qualities from './qualities';

import Table from '../common/table';

const UserTable = (props) => {
  const { users, onSort, selectedSort, onToggleBookmark, onDelete } = props;

  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: {
      path: 'profession.name',
      name: 'Профессия',
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз',
    },
    rate: {
      path: 'rate',
      name: 'Оценка',
    },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className='btn btn-danger'>
          Delete
        </button>
      ),
    },
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;
