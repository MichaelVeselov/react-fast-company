import PropTypes from 'prop-types';

const Quality = (props) => {
  const { color = '', name = '' } = props;

  return <span className={'badge m-1 bg-' + color}>{name}</span>;
};

Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Quality;
