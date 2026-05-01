import api from './api';

export const fetchUsers = (params?: { role?: string }) => api.get('/users', { params });

export default { fetchUsers };