import './App.css';

import { useState, useEffect } from 'react';

import api from './api';

import Users from './components/Users.jsx';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

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

  return (
    <>
      {!loading && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </>
  );
}

export default App;
