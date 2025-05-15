import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://inklink-be.onrender.com/api',
  //   withCredentials: true,9155bae7e7dcc19e02dafee6ce13c56480806a4c
});
