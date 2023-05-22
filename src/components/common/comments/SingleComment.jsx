import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { displayDate } from '../../../utils/displayDate';

import api from '../../../api';

import { randomInteger } from '../../../utils/randomInteger';

const SingleComment = (props) => {
  const { content, created_at: created, _id: id, userId, onRemove } = props;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.users.getById(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className='col'>
            <div className='d-flex flex-start '>
              <img
                src={`https://api.dicebear.com/api/avataaars/${randomInteger()}.svg`}
                className='rounded-circle shadow-1-strong me-3'
                alt='avatar'
                width='65'
                height='65'
              />
              <div className='flex-grow-1 flex-shrink-1'>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-1 '>
                      {user && user.name}
                      <span className='small'> - {displayDate(created)}</span>
                    </p>
                    <button
                      className='btn btn-sm text-primary d-flex align-items-center'
                      onClick={() => onRemove(id)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  </div>
                  <p className='small mb-0'>{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SingleComment.propTypes = {
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  _id: PropTypes.string,
  userId: PropTypes.string,
  onRemove: PropTypes.func,
};

export default SingleComment;
