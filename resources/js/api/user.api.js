import api from "./api";

export const getUsers = async ({page,  limit, search, sortField, sortOrder, }) => {
    const res = await api.get("/users", {
        params: { page,  limit, search, sort_by: sortField,  sort_order: sortOrder, // asc | desc
        },
    });

    return res;
};
