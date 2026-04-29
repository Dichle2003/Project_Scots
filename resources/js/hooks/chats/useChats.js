import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import {createChat} from "@/api/chat.api.js";
const module = 'chats';

export const useAddChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${module}`] });
        },
    });
};
