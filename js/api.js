import { GET_DATA_URL, POST_DATA_URL } from './const.js';

const getData = (onSuccess, onFail) => {
  fetch(
    GET_DATA_URL,
  ).then((response) => {
    response.ok ? onSuccess() : onFail();
  }).catch(() => {
    onFail();
  });
};

const sendData = (body, onSuccess, onFail) => {
  fetch(
    POST_DATA_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    response.ok ? onSuccess() : onFail();
  }).catch(() => {
    onFail();
  });
};

export { getData, sendData };
