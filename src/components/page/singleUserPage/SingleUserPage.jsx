import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserById } from '../../../store/users';

import SingleUserCard from '../../ui/SingleUserCard';
import QualityCard from '../../ui/QualityCard';
import MeetingCard from '../../ui/MeetingCard';
import Comments from '../../ui/Comments';

const SingleUserPage = (props) => {
  const { userId } = props;

  const user = useSelector(getUserById(userId));

  const content = <View user={user} />;

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
