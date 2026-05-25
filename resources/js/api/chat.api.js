import api from "./api";
const module = "chats";

export const createChat = (data) => api.post(`${module}`, data);
export const getChat = (id) => api.get(`${module}/${id}`);
export const getChats = () => api.get(`${module}`);
export const updateChat = (id, data) => api.put(`${module}/${id}`, data);
export const deleteChat = (id) => api.delete(`${module}/${id}`);
