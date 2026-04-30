import api from './api';

export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);
export const me = () => api.get('/auth/me');

export default { register, login, me };
