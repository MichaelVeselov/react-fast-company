import PropTypes from 'prop-types';

import Quality from './Qualitiy';

function QuaityList(props) {
  const { qualities } = props;
  return (
    <>
      {qualities.map((item) => (
        <Quality key={item._id} {...item} />
      ))}
    </>
  );
}

QuaityList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QuaityList;
