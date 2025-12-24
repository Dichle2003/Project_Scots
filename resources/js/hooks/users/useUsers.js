import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { getUsers, createUser } from "@/api/user.api";

export const useUsers = (query) => {
    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        keepPreviousData: true,
    });
};
// Hook thêm mới user
export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser, // chỉ định function API
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
