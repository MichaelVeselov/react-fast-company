import axios from 'axios';
import { toast } from 'react-toastify';
import configAPI from '../config.json';

const http = axios.create({
  baseURL: configAPI.apiEndPoint,
});

http.interceptors.request.use(
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

http.interceptors.response.use(
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;
