import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '../../../store/qualities';

import Quality from './Qualitiy';

function QuaityList(props) {
  const dispatch = useDispatch();

  const { qualities } = props;

  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!isLoading
        ? qualitiesList.map((item) => <Quality key={item._id} {...item} />)
        : 'Loading...'}
    </>
  );
}

QuaityList.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QuaityList;
