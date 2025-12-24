import api from "./api";
export const getUsers = async ({page,  limit, search, sortField, sortOrder }) => {
    const res = await api.get("/users", {
        params: { page,  limit, search, sort_by: sortField,  sort_order: sortOrder, // asc | desc
        },
    });
    return res;
};

export const removeUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
