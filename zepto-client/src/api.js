import axios from 'axios';

// const api = axios.create({
//   // baseURL: 'http://<YOUR_BACKEND_IP>:3001'  // 🔁 Replace with actual IP or domain
//   baseURL: 'http://localhost:3001'  // 🔁 Replace with actual IP or domain
// });

const api = axios.create({
  baseURL: 'http:// 54.209.182.187:3001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` // Or however you store it
  }
});

export default api;
