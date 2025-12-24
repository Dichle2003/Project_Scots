import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import {  getCenter,createCenter } from "@/api/center.api";

export const useCenters = (query) => {
    return useQuery({
        queryKey: ["centers", query],
        queryFn: () => getCenter(query),
        keepPreviousData: true,
    });
};
// Hook thêm mới center
export const useAddCenter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCenter, // chỉ định function API
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["centers"] });
        },
    });
};
