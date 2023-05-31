import PropTypes from 'prop-types';

const BookMark = (props) => {
  const { status, onClick } = props;

  return status ? (
    <button>
      <i className='bi bi-bookmark-heart-fill' onClick={onClick}></i>
    </button>
  ) : (
    <button>
      <i className='bi bi-bookmark' onClick={onClick}></i>
    </button>
  );
};

BookMark.propTypes = {
  // status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BookMark;
