/* eslint-disable import/no-cycle */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const mock = new MockAdapter(client);//for testing purposes


const request = (options) => {
  const onSuccess = response => {
    console.log(response,"responseresponse")
    const { data } = response;

    if (!data) {
      throw new Error('A server error has occurred. Please contact us.');
    }
    return data;
  };

  const onError = error => {
    console.error('Error Message:', error.response);
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
