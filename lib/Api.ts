import axios from 'axios';
const { BASE_URL_LOCALHOST, BASE_URL_PRODUCTION } = process.env;
const baseURL = process.env.NODE_ENV === 'production' ? BASE_URL_PRODUCTION : BASE_URL_LOCALHOST;

export const converToStringfy = <T>(obj: T): string => {
  return JSON.stringify(obj);
}

const api = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
