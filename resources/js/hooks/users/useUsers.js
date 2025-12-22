import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/user.api";
import { toast } from "react-toastify";

export const useUsers = (query) => {
    console.log('query', query)
    return useQuery({
        queryKey: ["users", query],
        queryFn: () => getUsers(query),
        keepPreviousData: true,
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Có lỗi xảy ra"
            );
        },
    });
};
