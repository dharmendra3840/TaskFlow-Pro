import api from './api';

export const fetchProjects = () => api.get('/projects');
export const getProject = (id: string) => api.get(`/projects/${id}`);
export const createProject = (data: any) => api.post('/projects', data);
export const updateProject = (id: string, data: any) => api.put(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);
export const addMember = (projectId: string, userId: string) => api.post(`/projects/${projectId}/members`, { userId });
export const removeMember = (projectId: string, userId: string) => api.delete(`/projects/${projectId}/members/${userId}`);

export default { fetchProjects, getProject, createProject, updateProject, deleteProject, addMember, removeMember };
