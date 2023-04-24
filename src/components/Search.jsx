import PropTypes from 'prop-types';

const Search = (props) => {
  const { search, onSearch } = props;
  return (
    <div className='mb-3'>
      <input
        type='search'
        className='form-control w-100'
        name='search'
        placeholder='Search...'
        value={search}
        onChange={onSearch}
      />
    </div>
  );
};

Search.defaultProps = {
  search: '',
};

Search.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default Search;
