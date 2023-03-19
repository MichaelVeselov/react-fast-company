const BookMark = (props) => {
  const { status = false, onClick = Function.prototype } = props;

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

export default BookMark;
