import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../api';

import Quality from './Qualitiy';

const SingleUser = (props) => {
  const { userId } = props;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (!user || loading) return <h2>Loading</h2>;

  const content = !user || loading ? <h2>Loading</h2> : <View user={user} />;

  return <>{content}</>;
};

const View = ({ user }) => {
  const { name, profession, qualities, completedMeetings, rate } = user;
  const history = useHistory();

  return (
    <>
      <div className='card mb-3' style={{ width: '25rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>
            <span className='fw-bolder'>Имя:</span> {name}
          </h5>
          <p className='card-text'>
            <span className='fw-bolder'>Профессия:</span> {profession.name}
          </p>
          <p className='card-text'>
            <span className='fw-bolder'>Качества:</span>
            {qualities.map((item) => (
              <Quality key={item._id} {...item} />
            ))}
          </p>
          <p className='card-text'>
            <span className='fw-bolder'>Встретился, раз:</span>{' '}
            {completedMeetings}
          </p>
          <p className='card-text'>
            <span className='fw-bolder'>Оценка:</span> {rate}
          </p>
        </div>
      </div>
      <button
        className='btn btn-primary'
        onClick={() => {
          history.replace('/users');
        }}
      >
        Все пользователи
      </button>
    </>
  );
};

SingleUser.propTypes = {
  userId: PropTypes.string,
};

export default SingleUser;
