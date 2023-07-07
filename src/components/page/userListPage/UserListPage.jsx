import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { isEqual, orderBy } from 'lodash';

import { paginate } from '../../../utils/paginate';

import {
  getProfessions,
  getProfessionsLoadingStatus,
} from '../../../store/professions';

import { getUsersList, getCurrentUserId } from '../../../store/users';

import SearchStatus from '../../ui/SearchStatus';
import Search from '../../ui/Search';
import GroupList from '../../common/GroupList';
import UserTable from '../../ui/UserTable';
import Pagination from '../../common/Pagination';

const UserListPage = () => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const currentUserId = useSelector(getCurrentUserId());

  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());

  const [search, setSearch] = useState('');

  const pageSize = 6;

  const users = useSelector(getUsersList());

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfession]);

  const handleSearch = (event) => {
    if (selectedProfession) {
      clearFilter();
    }
    const value = event.target.value;
    setSearch(value);
  };

  const handleToggleBookmark = (userId) => {
    const newUserArray = users.map((user) => {
      if (user._id === userId) {
        return { ...user, bookmark: !user.bookmark };
      } else {
        return user;
      }
    });
    console.log(newUserArray);
  };

  const handleProfessionSelect = (item) => {
    clearSearch();
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

  const clearSearch = () => {
    setSearch('');
  };

  if (users?.length) {
    const filteredUsers = selectedProfession
      ? users.filter((user) => isEqual(user.profession, selectedProfession._id))
      : users.filter((user) =>
          user.name?.toLowerCase().includes(search.toLowerCase())
        );

    const sortedUsers = orderBy(
      filteredUsers.filter((user) => user._id !== currentUserId),
      [sortBy.path, 'name'],
      [sortBy.order]
    );

    const userCount = sortedUsers.length;

    const pageNumber = Math.ceil(userCount / pageSize);

    if (currentPage > pageNumber && currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className='d-flex'>
        {!professionLoading && Object.keys(professions).length !== 0 && (
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
          <Search search={search} onSearch={handleSearch} />
          {userCount > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
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
  return <h2>Loading...</h2>;
};

export default UserListPage;
