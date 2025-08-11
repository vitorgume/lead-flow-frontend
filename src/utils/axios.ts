import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('chave-secreta');

  const rotasPublicas = ['/login'];
  const url = config.url || '';
  const isRotaPublica = rotasPublicas.some((rota) => url.includes(rota));

  // Garante headers
  const h = config.headers || {};
  // Se for Axios v1 (AxiosHeaders), use set/delete
  const setHeader = (name: any, value: any) => {

    if (h && typeof h.set === 'function') {
      if (value == null) h.delete(name);
      else h.set(name, value);
    } else {
      if (value == null) delete h[name];
      else h[name] = value;
    }
  };

  // Sempre manda a API key
  if (apiKey) setHeader('X-API-KEY', apiKey);

  // Só manda o Bearer nas rotas privadas
  if (!isRotaPublica && token) {
    setHeader('Authorization', `Bearer ${token}`);
  } else {
    // Garante que não vai Bearer em /login
    setHeader('Authorization', null);
  }

  config.headers = h;
  return config;
}, (error) => Promise.reject(error));

export default api;
