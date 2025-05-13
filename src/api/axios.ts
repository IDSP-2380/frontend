import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://inklink-be.onrender.com/api',
  //   withCredentials: true,
});
