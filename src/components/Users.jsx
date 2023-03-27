import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { isEqual } from 'lodash';

import { paginate } from '../utils/paginate';

import api from '../api';

import SearchStatus from './SearchStatus';
import GroupList from './GroupList';
import User from './User';
import Pagination from './Pagination';

const Users = (props) => {
  const { users: allUsers, ...rest } = props;

  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const handleProfessionSelect = (item) => {
    setSelectedProfession(item);
  };

  const filteredUsers = selectedProfession
    ? allUsers.filter((user) => isEqual(user.profession, selectedProfession))
    : allUsers;

  const clearFilter = () => {
    setSelectedProfession(null);
  };

  const userCount = filteredUsers.length;
  const pageSize = 2;

  if (currentPage > Math.ceil(userCount / pageSize)) {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className='d-flex'>
      {!loading && Object.keys(professions).length !== 0 && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            items={professions}
            selectedItem={selectedProfession}
            onItemSelect={handleProfessionSelect}
          />
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>
            Очистить фильтр
          </button>
        </div>
      )}
      <div className='d-flex flex-column'>
        <SearchStatus length={userCount} />
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
        <div className='d-flex justify-content-center'>
          <Pagination
            itemCount={userCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
};

export default Users;
