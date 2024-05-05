import axios from 'axios';
const baseURL = process.env.NODE_ENV === "production" ? process.env.BASE_URL_PRODUCTION : process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST;

export const converToStringfy = (obj: any): string => {
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

