import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://inklink-be.onrender.com/api',
  withCredentials: true,
});
