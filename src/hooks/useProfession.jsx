import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import professionService from '../services/profession.service';

const ProfessionContext = createContext();

export const useProfession = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getProfessions() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getProfessionById(id) {
    return professions.find((item) => item._id === id);
  }

  useEffect(() => {
    getProfessions();
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
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
