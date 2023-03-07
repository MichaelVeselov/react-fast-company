import { useState } from 'react';

import api from '../api';

import TableHead from './table/tableHead';
import TableDataRow from './table/tableDataRow';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const deleteRecord = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const getEnding = (num) => {
    const last = num.toString().slice(-1);

    if (num === 1) {
      return { nounEnding: '', verbEnding: 'ет' };
    }

    if (last === '2' || last === '3' || last === '4') {
      return { nounEnding: 'а', verbEnding: 'ут' };
    }

    return { nounEnding: '', verbEnding: 'ут' };
  };

  const getPhrase = (num) => {
    const { nounEnding, verbEnding } = getEnding(num);

    return `${num} человек${nounEnding} тусан${verbEnding} с тобой сегодня!`;
  };

  return users.length ? (
    <>
      <div className='badge bg-primary'>{getPhrase(users.length)}</div>
      <table className='table'>
        <thead>{<TableHead />}</thead>
        <tbody>
          {users.map((user) => {
            const { _id, name, qualities, profession, completedMeetings, rate } = user;
            return (
              <TableDataRow
                key={_id}
                id={_id}
                name={name}
                qualities={qualities}
                profession={profession.name}
                completedMeetings={completedMeetings}
                rate={rate}
                deleteRecord={deleteRecord}
              />
            );
          })}
        </tbody>
      </table>
    </>
  ) : (
    <div className='badge bg-danger'>Никто с тобой не тусанет!</div>
  );
};

export default Users;
