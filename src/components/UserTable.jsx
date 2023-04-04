import PropTypes from 'prop-types';

import BookMark from './BookMark';
import QuaityList from './QuaityList';

import Table from './Table';

const UserTable = (props) => {
  const { users, onSort, selectedSort, onToggleBookmark, onDelete } = props;

  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
    },
    qualities: {
      name: 'Качества',
      component: (user) => <QuaityList qualities={user.qualities} />,
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
