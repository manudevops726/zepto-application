import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.209.182.187:3001', // Replace with your backend IP or domain
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
});

export default api;
