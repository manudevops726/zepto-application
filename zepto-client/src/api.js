import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.207.250.153:3001', // Replace with your backend IP or domain
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
});

export default api;
