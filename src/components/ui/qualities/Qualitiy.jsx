import PropTypes from 'prop-types';

const Quality = (props) => {
  const { color, name } = props;

  return <span className={'badge m-1 bg-' + color}>{name}</span>;
};

Quality.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
};

export default Quality;
