import './App.css';

import { useState } from 'react';

import api from './api';

import Users from './components/Users.jsx';
import SearchStatus from './components/SearchStatus';

const initialState = api.users.fetchAll().map((item) => {
  return { ...item, favorite: false };
});

function App() {
  const [users, setUsers] = useState(initialState);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleChange = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          return { ...user, favorite: !user.favorite };
        } else {
          return user;
        }
      })
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onChange={handleChange} />
    </>
  );
}

export default App;
