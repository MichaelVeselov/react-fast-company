import { useEffect, useState } from 'react';

import httpService from '../services/http.service';

import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';

export const useMockData = () => {
  const statuses = {
    idle: 'not started...',
    pending: 'in process...',
    success: 'ready...',
    error: 'error occured...',
  };

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statuses.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  const totalCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statuses.idle) {
      setStatus(statuses.pending);
    }

    const newProgress = Math.floor((count / totalCount) * 100);

    if (progress < newProgress) {
      setProgress(() => newProgress);
    }

    if (newProgress === 100) {
      setProgress(statuses.success);
    }
  };

  useEffect(() => {
    updateProgress();
    // eslint-disable-next-line
  }, [count]);

  async function initialize() {
    try {
      for (const item of professions) {
        await httpService.put('profession/' + item._id, item);
        incrementCount();
      }
      for (const item of qualities) {
        await httpService.put('quality/' + item._id, item);
        incrementCount();
      }
      for (const item of users) {
        await httpService.put('user/' + item._id, item);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statuses.error);
    }
  }

  return { error, initialize, progress, status };
};
