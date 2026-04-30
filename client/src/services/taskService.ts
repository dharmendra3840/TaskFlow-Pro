import api from './api';

export const fetchTasks = (params?: any) => api.get('/tasks', { params });
export const createTask = (data: any) => api.post('/tasks', data);
export const updateTask = (id: string, data: any) => api.put(`/tasks/${id}`, data);

export default { fetchTasks, createTask, updateTask };
