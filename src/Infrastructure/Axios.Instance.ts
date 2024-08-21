import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3000/', // Assurez-vous que cela correspond à l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});