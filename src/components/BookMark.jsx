const BookMark = (props) => {
  const { status = false, onChange = Function.prototype } = props;

  return status ? (
    <i className='bi bi-bookmark' style={{ cursor: 'pointer' }} onClick={onChange}></i>
  ) : (
    <i className='bi bi-bookmark-fill' style={{ cursor: 'pointer' }} onClick={onChange}></i>
  );
};

export default BookMark;
