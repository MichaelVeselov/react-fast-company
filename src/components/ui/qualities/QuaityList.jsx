import PropTypes from 'prop-types';

import Quality from './Qualitiy';
import { useQuality } from '../../../hooks/useQuality';

function QuaityList(props) {
  const { qualities } = props;
  const { isLoading } = useQuality();

  return (
    <>
      {!isLoading
        ? qualities.map((item) => <Quality key={item} id={item} />)
        : 'Loading...'}
    </>
  );
}

QuaityList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QuaityList;
