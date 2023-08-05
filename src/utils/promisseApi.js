import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8000/'

export const api = axios.create({
  baseURL: baseURL,
  headers
});

export const promisseApi = (method, path, callbackData, callbackError, body = {}, config = {}) => {
  let configAxios = {
    method: method,
    timeout: 20000,
    url: `${baseURL}${path}`,
    ...config,
    data: body
  };

  axios(configAxios)
    .then(data => {
      callbackData(data.data)
    })
    .catch(err => {
      callbackError(err)
    });
}
