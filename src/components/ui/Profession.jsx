import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getProfessionsByIds,
  getProfessionsLoadingStatus,
} from '../../store/professions';

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionsByIds(id));
  const isLoading = useSelector(getProfessionsLoadingStatus());

  if (!isLoading) {
    return <p>{profession.name}</p>;
  } else {
    return 'Loading...';
  }
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
