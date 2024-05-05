import axios from 'axios';
const { BASE_URL_PRODUCTION, NEXT_PUBLIC_BASE_URL_LOCALHOST } = process.env;
const baseURL = process.env.NODE_ENV === "production" ? BASE_URL_PRODUCTION : NEXT_PUBLIC_BASE_URL_LOCALHOST;

export const converToStringfy = (obj: any): string => {
  return JSON.stringify(obj);
}

console.log(baseURL)

const api = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

