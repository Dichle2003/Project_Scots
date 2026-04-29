import api from "./api";
const module = "chats";
export const createChat = (data) => api.post(`${module}`, data);
