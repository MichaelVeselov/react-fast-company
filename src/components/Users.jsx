import { useState } from 'react';
import PropTypes from 'prop-types';

import { paginate } from '../utils/paginate';

import User from './User';
import Pagination from './Pagination';

const Users = (props) => {
  const { users, ...rest } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const userCount = users.length;
  const pageSize = 4;

  if (currentPage > Math.ceil(userCount / pageSize)) {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {userCount > 0 && (
        <table className='table align-middle'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'>Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemCount={userCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
};

export default Users;
