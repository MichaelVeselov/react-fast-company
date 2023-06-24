import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import BookMark from '../common/BookMark';
import Qualities from './qualities';
import Profession from './Profession';

import Table from '../common/table';

const UserTable = (props) => {
  const { users, onSort, selectedSort, onToggleBookmark } = props;

  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      path: 'quality',
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: {
      path: 'profession',
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />,
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
};

export default UserTable;
