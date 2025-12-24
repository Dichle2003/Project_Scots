import api from "./api";
export const getUsers = async ({page,  limit, search, sortField, sortOrder }) => {
    const res = await api.get("/centers", {
        params: { page,  limit, search, sort_by: sortField,  sort_order: sortOrder, // asc | desc
        },
    });
    return res;
};
export const getCenter = (data) => api.get("/centers", data);
export const createCenter = (data) => api.post("/centers", data);
