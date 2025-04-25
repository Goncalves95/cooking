// src/services/api.js
import axios from 'axios';

// Obtenha a URL da API das variáveis de ambiente (configuradas no .env)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação, se necessário
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros comuns
api.interceptors.response.use(
  response => response,
  error => {
    // Tratamento de erro centralizado
    if (error.response) {
      // Erro do servidor (status codes fora do range 2xx)
      console.error('Erro na resposta da API:', error.response.data);
      
      // Tratamento específico para erro de autenticação
      if (error.response.status === 401) {
        // Limpar token e redirecionar para login, se necessário
        localStorage.removeItem('token');
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Sem resposta do servidor
      console.error('Sem resposta do servidor:', error.request);
    } else {
      // Erro na configuração da requisição
      console.error('Erro na requisição:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Serviços específicos para diferentes entidades
const recipeService = {
  getAll: () => api.get('/recipes'),
  getById: (id) => api.get(`/recipes/${id}`),
  getFeatured: () => api.get('/recipes/featured'),
  getByCategory: (category) => api.get(`/recipes/category/${category}`),
  getByCountry: (country) => api.get(`/recipes/country/${country}`),
  create: (recipeData) => api.post('/recipes', recipeData),
  update: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  delete: (id) => api.delete(`/recipes/${id}`)
};

const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return token ? api.get('/auth/me') : Promise.resolve(null);
  }
};

export { recipeService, authService };
export default api;