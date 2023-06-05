import axios from 'axios';
import { toast } from 'react-toastify';
import configAPI from '../config.json';

axios.defaults.baseURL = configAPI.apiEndPoint;

axios.interceptors.request.use(
  function (config) {
    if (configAPI.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

axios.interceptors.response.use(
  (response) => {
    if (configAPI.isFireBase) {
      response.data = { content: transformData(response.data) };
    }
    return response;
  },

  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log(error);
      toast.error('Something went wrong...');
      toast('Unexpected error');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
