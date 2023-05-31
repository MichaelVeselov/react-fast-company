import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import qualityService from '../services/quality.service';

const QualityContext = createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getQualities() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getQualityById(id) {
    return qualities.find((item) => item._id === id);
  }

  useEffect(() => {
    getQualities();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQualityById }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
