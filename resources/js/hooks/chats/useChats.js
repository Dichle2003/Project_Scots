import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat, getChat } from "@/api/chat.api.js";
const module = 'chats';

export const useAddChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [module] });
        },
    });
};

export const useChat = (id) => {
    return useQuery({
        queryKey: [module, id],
        queryFn: () => getChat(id),
        enabled: !!id,
    });
};
