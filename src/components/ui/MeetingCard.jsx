import PropTypes from 'prop-types';

const MeetingCard = (props) => {
  const { value } = props;
  return (
    <div className='card mb-3'>
      <div className='card-body d-flex flex-column justify-content-center text-center'>
        <h5 className='card-title'>
          <span>Completed meetings</span>
        </h5>
        <h2 className='display-1'>{value}</h2>
      </div>
    </div>
  );
};

MeetingCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MeetingCard;
