import { useState, useEffect } from 'react';

import { isEqual, orderBy } from 'lodash';

import { paginate } from '../utils/paginate';

import api from '../api';

import SearchStatus from './SearchStatus';
import GroupList from './GroupList';
import UserTable from './Usertable';
import Pagination from './Pagination';

const Users = () => {
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const pageSize = 6;

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark };
        } else {
          return user;
        }
      })
    );
  };

  const handleProfessionSelect = (item) => {
    setSelectedProfession(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setSelectedProfession(null);
  };

  if (users.length) {
    const filteredUsers = selectedProfession
      ? users.filter((user) => isEqual(user.profession, selectedProfession))
      : users;

    const sortedUsers = orderBy(
      filteredUsers,
      //[sortBy.path, 'name'],
      [sortBy.path],
      [sortBy.order]
    );

    const userCount = filteredUsers.length;

    if (currentPage > Math.ceil(userCount / pageSize)) {
      setCurrentPage((currentPage) => currentPage - 1);
    }

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
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
  }
  return 'loading...';
};

export default Users;
