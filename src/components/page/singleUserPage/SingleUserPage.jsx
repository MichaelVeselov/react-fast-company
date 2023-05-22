import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import api from '../../../api';

import SingleUserCard from '../../ui/SingleUserCard';
import QualityCard from '../../ui/QualityCard';
import MeetingCard from '../../ui/MeetingCard';
import Comments from '../../ui/Comments';

const SingleUserPage = (props) => {
  const { userId } = props;

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = !user || loading ? <h2>Loading</h2> : <View user={user} />;

  return <>{content}</>;
};

const View = ({ user }) => {
  const { qualities, completedMeetings } = user;

  return (
    <div className='container'>
      <div className='row gutters-sm'>
        <div className='col-md-4 mb-3'>
          <SingleUserCard user={user} />
          <QualityCard data={qualities} />
          <MeetingCard value={completedMeetings} />
        </div>
        <div className='col-md-8'>
          <h3>Comments</h3>
          <Comments />
        </div>
      </div>
    </div>
  );
};

SingleUserPage.propTypes = {
  userId: PropTypes.string,
};

export default SingleUserPage;
