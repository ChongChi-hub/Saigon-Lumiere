import axios from 'axios';

// json-server runs on port 3000 as defined in package.json
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
